const { expressjwt: jwt } = require('express-jwt');
const { secret } = require('../config.json');
const db = require('../config/database');

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User')
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ 
            secret, 
            algorithms: ['HS256'],
            credentialsRequired: true,
            getToken: function fromHeaderOrQuerystring(req) {
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                    return req.headers.authorization.split(' ')[1];
                } else if (req.query && req.query.token) {
                    return req.query.token;
                }
                return null;
            }
        }),

        // authorize based on user role
        async (req, res, next) => {
            const [accounts] = await db.query('SELECT * FROM accounts WHERE id = ?', [req.auth.id]);
            const account = accounts[0];

            if (!account || (roles.length && !roles.includes(account.role))) {
                // account no longer exists or role not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            req.user = {
                id: account.id,
                role: account.role
            };
            // Helper to check if user owns a refresh token
            req.user.ownsToken = async (token) => {
                const [tokens] = await db.query('SELECT * FROM refreshTokens WHERE accountId = ? AND token = ?', [account.id, token]);
                return tokens.length > 0;
            };

            next();
        }
    ];
}