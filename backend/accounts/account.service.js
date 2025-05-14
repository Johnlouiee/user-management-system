const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Op } = require('sequelize');
const db = require('../config/database');
const Role = require('../_helpers/role');
const config = require('../config.json');
const sendEmail = require('../_helpers/send-email');

module.exports = {
    authenticate,
    refreshToken,
    revokeToken,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    console.log('Authentication attempt for email:', email);
    
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) {
        console.log('No user found with email:', email);
        throw 'Email or password is incorrect';
    }

    const passwordMatch = password === user.password;
    console.log('Password match result:', passwordMatch);
    
    if (!passwordMatch) {
        console.log('Password does not match for user:', email);
        throw 'Email or password is incorrect';
    }

    // Check if user is active (admin users are always considered active)
    if (!user.is_active && user.role !== Role.Admin) {
        console.log('User account is not active:', email);
        throw 'Your account is not active. Please contact the administrator.';
    }

    console.log('Authentication successful for user:', email);
    
    // authentication successful so generate jwt token
    const jwtToken = generateJwtToken(user);

    // return basic details and token
    return {
        ...basicDetails(user),
        jwtToken
    };
}

async function refreshToken({ token, ipAddress }) {
    const [tokens] = await db.query(
        'SELECT t.*, a.* FROM refreshTokens t JOIN accounts a ON t.accountId = a.id WHERE t.token = ?',
        [token]
    );
    const refreshToken = tokens[0];

    if (!refreshToken || !refreshToken.isActive) {
        throw 'Invalid token';
    }

    const account = {
        id: refreshToken.accountId,
        role: refreshToken.role
    };

    // replace old refresh token with a new one
    const newRefreshToken = generateRefreshToken(account, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;

    await db.query(
        'UPDATE refreshTokens SET revoked = ?, revokedByIp = ?, replacedByToken = ? WHERE id = ?',
        [refreshToken.revoked, refreshToken.revokedByIp, refreshToken.replacedByToken, refreshToken.id]
    );

    await db.query(
        'INSERT INTO refreshTokens (token, accountId, expires, created, createdByIp) VALUES (?, ?, ?, NOW(), ?)',
        [newRefreshToken.token, account.id, newRefreshToken.expires, ipAddress]
    );

    // generate new jwt
    const jwtToken = generateJwtToken(account);

    // return basic details and tokens
    return {
        ...basicDetails(account),
        jwtToken,
        refreshToken: newRefreshToken.token
    };
}

async function revokeToken({ token, ipAddress }) {
    const [tokens] = await db.query('SELECT * FROM refreshTokens WHERE token = ?', [token]);
    const refreshToken = tokens[0];

    if (!refreshToken || !refreshToken.isActive) {
        throw 'Invalid token';
    }

    // revoke token and save
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;

    await db.query(
        'UPDATE refreshTokens SET revoked = ?, revokedByIp = ? WHERE id = ?',
        [refreshToken.revoked, refreshToken.revokedByIp, refreshToken.id]
    );
}

async function register(params) {
    console.log('=== Registration Process Started ===');
    console.log('Registration attempt with params:', { 
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        password: '[REDACTED]'
    });
    
    try {
        // validate
        console.log('Checking for existing users with email:', params.email);
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [params.email]);
        console.log('Existing users check result:', existingUsers);
        
        if (existingUsers.length > 0) {
            console.log('Registration failed: Email already exists');
            throw 'Email "' + params.email + '" is already registered';
        }

        // create user object
        const user = {
            username: params.firstName.toLowerCase() + params.lastName.toLowerCase(),
            email: params.email,
            password: params.password,
            role: Role.User,
            is_active: true, // Set new users as active by default
            created_at: new Date(),
            updated_at: new Date()
        };
        console.log('Created user object:', { 
            username: user.username,
            email: user.email,
            role: user.role,
            is_active: user.is_active,
            created_at: user.created_at,
            updated_at: user.updated_at
        });

        // save user
        console.log('Attempting to insert user into database...');
        const [result] = await db.query(
            'INSERT INTO users (username, email, password, role, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user.username, user.email, user.password, user.role, user.is_active, user.created_at, user.updated_at]
        );
        console.log('Database insert result:', result);
        
        if (!result || !result.insertId) {
            throw 'Failed to insert user into database';
        }
        
        user.id = result.insertId;
        console.log('User registered successfully with ID:', user.id);

        // Verify the user was actually inserted
        const [verifyUsers] = await db.query('SELECT * FROM users WHERE id = ?', [user.id]);
        console.log('Verification query result:', verifyUsers);

        if (verifyUsers.length === 0) {
            throw 'User was not properly saved to the database';
        }

        // After user is inserted and before returning success
        const [allUsers] = await db.query('SELECT * FROM users');
        console.log('All users in database after registration:', allUsers);

        console.log('=== Registration Process Completed Successfully ===');
        return {
            ...basicDetails(user),
            message: 'User successfully registered and saved to database'
        };
    } catch (error) {
        console.error('Registration error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            throw 'Username or email is already taken';
        }
        throw error;
    }
}

async function verifyEmail(token) {
    const [accounts] = await db.query('SELECT * FROM accounts WHERE verificationToken = ?', [token]);
    const account = accounts[0];

    if (!account) throw 'Verification failed';

    account.verified = Date.now();
    account.verificationToken = null;

    await db.query(
        'UPDATE accounts SET verified = ?, verificationToken = ? WHERE id = ?',
        [account.verified, account.verificationToken, account.id]
    );
}

async function forgotPassword({ email }, origin) {
    const [accounts] = await db.query('SELECT * FROM accounts WHERE email = ?', [email]);
    const account = accounts[0];

    // always return ok response to prevent email enumeration
    if (!account) return;

    // create reset token that expires after 24 hours
    account.resetToken = randomTokenString();
    account.resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await db.query(
        'UPDATE accounts SET resetToken = ?, resetTokenExpires = ? WHERE id = ?',
        [account.resetToken, account.resetTokenExpires, account.id]
    );

    // send email
    await sendPasswordResetEmail(account, origin);
}

async function validateResetToken({ token }) {
    const [accounts] = await db.query(
        'SELECT * FROM accounts WHERE resetToken = ? AND resetTokenExpires > NOW()',
        [token]
    );
    const account = accounts[0];

    if (!account) {
        throw 'Invalid token';
    }
}

async function resetPassword({ token, password }) {
    const [accounts] = await db.query(
        'SELECT * FROM accounts WHERE resetToken = ? AND resetTokenExpires > NOW()',
        [token]
    );
    const account = accounts[0];

    if (!account) {
        throw 'Invalid token';
    }

    // update password and remove reset token
    account.passwordHash = password;
    account.passwordReset = Date.now();
    account.resetToken = null;
    account.resetTokenExpires = null;

    await db.query(
        'UPDATE accounts SET passwordHash = ?, passwordReset = ?, resetToken = ?, resetTokenExpires = ? WHERE id = ?',
        [account.passwordHash, account.passwordReset, account.resetToken, account.resetTokenExpires, account.id]
    );
}

async function getAll() {
    const [users] = await db.query('SELECT * FROM users');
    return users.map(user => basicDetails(user));
}

async function getById(id) {
    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    const user = users[0];
    if (!user) throw 'User not found';
    return basicDetails(user);
}

async function create(params) {
    // validate
    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [params.email]);
    if (existingUsers.length > 0) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const user = {
        username: params.username,
        email: params.email,
        password: params.password,
        role: params.role,
        is_active: params.role === Role.Admin, // Set active if admin
        created_at: new Date(),
        updated_at: new Date()
    };

    const [result] = await db.query(
        'INSERT INTO users (username, email, password, role, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [user.username, user.email, user.password, user.role, user.is_active, user.created_at, user.updated_at]
    );
    user.id = result.insertId;

    return basicDetails(user);
}

async function update(id, params) {
    const user = await getById(id);

    // validate
    if (params.email && user.email !== params.email) {
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [params.email]);
        if (existingUsers.length > 0) {
            throw 'Email "' + params.email + '" is already taken';
        }
    }

    // copy params to user and save
    Object.assign(user, params);
    user.updated_at = new Date();

    await db.query(
        'UPDATE users SET username = ?, email = ?, password = ?, role = ?, is_active = ?, updated_at = ? WHERE id = ?',
        [user.username, user.email, user.password, user.role, user.is_active, user.updated_at, id]
    );

    return basicDetails(user);
}

async function _delete(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
}

// helper functions

function basicDetails(user) {
    const { id, username, email, role, is_active } = user;
    return { id, username, email, role, is_active };
}

function generateJwtToken(user) {
    // create a jwt token containing the user id and role
    return jwt.sign({ sub: user.id, role: user.role }, config.secret, { expiresIn: '15m' });
}

function generateRefreshToken(account, ipAddress) {
    // create a refresh token that expires in 7 days
    return {
        token: randomTokenString(),
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

async function sendVerificationEmail(account, origin) {
    let message;
    if (origin) {
        const verifyUrl = `${origin}/account/verify-email?token=${account.verificationToken}`;
        message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
                   <p><code>${account.verificationToken}</code></p>`;
    }

    await sendEmail({
        to: account.email,
        subject: 'Sign-up Verification API - Verify Email',
        html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`
    });
}

async function sendPasswordResetEmail(account, origin) {
    let message;
    if (origin) {
        const resetUrl = `${origin}/account/reset-password?token=${account.resetToken}`;
        message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                   <p><code>${account.resetToken}</code></p>`;
    }

    await sendEmail({
        to: account.email,
        subject: 'Sign-up Verification API - Reset Password',
        html: `<h4>Reset Password Email</h4>
               ${message}`
    });
}