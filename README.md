# user-management-system

# ROLES
# backend-signup-auth -PURISIMA
# backend-authorization-crud - MORALES
# frontend-signup-auth -RIZADA
# frontend-profile-admin-fake-backend -SINGCO
# tester-functional-testing -SINGCO
# tester-security-testing -PURISIMA


# BACKEND -SIGNUP-AUTH
# DEVELOPER 1 - PURISIMA
 # 1.  Installment
 npm install
 npm install express swagger-ui-express yamljs
npm install sequelize mysql2
npm install nodemailer


 # 2. Creating js files
![image](https://github.com/Johnlouiee/user-management-system/blob/812a2341da22be3861759b45f83266e7e214d1a2/pictures/dbjs.jpg)
### db.js
![image](https://github.com/Johnlouiee/user-management-system/blob/812a2341da22be3861759b45f83266e7e214d1a2/pictures/sendemail.jpg)
### sendemail.js
![image](https://github.com/Johnlouiee/user-management-system/blob/812a2341da22be3861759b45f83266e7e214d1a2/pictures/swaggerjs.jpg)
### swagger.js
![image](https://github.com/Johnlouiee/user-management-system/blob/812a2341da22be3861759b45f83266e7e214d1a2/pictures/authorize.jpg)
### authroize.js
![image](https://github.com/Johnlouiee/user-management-system/blob/812a2341da22be3861759b45f83266e7e214d1a2/pictures/errorhandler.jpg)
### errorhandler.js
![image](https://github.com/Johnlouiee/user-management-system/blob/812a2341da22be3861759b45f83266e7e214d1a2/pictures/validate.jpg)
### validate-request.js
![image](https://github.com/Johnlouiee/user-management-system/blob/812a2341da22be3861759b45f83266e7e214d1a2/pictures/accountmodel.jpg)
### account.model.js
![image](https://github.com/Johnlouiee/user-management-system/blob/812a2341da22be3861759b45f83266e7e214d1a2/pictures/accountservice.jpg)
### account.service.js
![image](https://github.com/Johnlouiee/user-management-system/blob/812a2341da22be3861759b45f83266e7e214d1a2/pictures/accountcontroller.jpg)
### account.controller.js
![image](https://github.com/Johnlouiee/user-management-system/blob/812a2341da22be3861759b45f83266e7e214d1a2/pictures/refreshtoken.jpg)
### refresh-token.model.js
![image](https://github.com/Johnlouiee/user-management-system/blob/e9806c4b40275bfc1958e58a7ae470be47b9e5c9/pictures/serverjs.jpg)
### server.js

# 3. creating database in xampp
![image](https://github.com/Johnlouiee/user-management-system/blob/e9806c4b40275bfc1958e58a7ae470be47b9e5c9/pictures/create%20database.jpg)
### After creating Use the database
![image](https://github.com/Johnlouiee/user-management-system/blob/e9806c4b40275bfc1958e58a7ae470be47b9e5c9/pictures/this%20is%20the%20current%20dummy%20email.jpg)
### this is the dummy email account for now when i refresh it it will generate new account
![image](https://github.com/Johnlouiee/user-management-system/blob/e9806c4b40275bfc1958e58a7ae470be47b9e5c9/pictures/configjson.jpg)
### this is my config.json and  i copy the user and pass on the dummy email account
![image](https://github.com/Johnlouiee/user-management-system/blob/e9806c4b40275bfc1958e58a7ae470be47b9e5c9/pictures/npm%20start.jpg)
### I started the npm to test already the auth
![image](https://github.com/Johnlouiee/user-management-system/blob/e9806c4b40275bfc1958e58a7ae470be47b9e5c9/pictures/registered.jpg)
### This is where i test the register then it was sucessful
![image](https://github.com/Johnlouiee/user-management-system/blob/e9806c4b40275bfc1958e58a7ae470be47b9e5c9/pictures/receive%20email.jpg)
### This is where i open the mailbox then see the notifcation andd receive the token
![image](https://github.com/Johnlouiee/user-management-system/blob/e9806c4b40275bfc1958e58a7ae470be47b9e5c9/pictures/pastetoken.jpg)
### This is where i paste the token in the verify-email then it was successful
![image](https://github.com/Johnlouiee/user-management-system/blob/b30cf22934be7f29867250f49e1c0565c7dc9228/pictures/authenticate.jpg)
### This is where the authentication then my password is not from the ethereal because when i registerd my password is 1234567 thats why when i type the password on the ethereal which is XXAGuW8RRgGdX1k2Kn it says incorrect thats why
![image](https://github.com/Johnlouiee/user-management-system/blob/d6df398ff38c14d749ec32721f4925aa47d044d8/backend/pictures/autheticate%20headers%20purisima.jpg)
### refresh token cookie
![image](https://github.com/Johnlouiee/user-management-system/blob/fcfafd95e40e6a11c4dfb09fe42f97e4beceb1be/backend/pictures/merged%20dev%201.jpg)
### Merged dev 1


# backend-authorization-crud
# Developer 2 - MORALES

1. thunder client
![image](https://github.com/Johnlouiee/user-management-system/blob/baadc97cd3f9e3345fb7ceb10757c5e4a9935dab/backend/pictures/forgot-password.png)
### This is where i post forgot-password
![image](https://github.com/Johnlouiee/user-management-system/blob/baadc97cd3f9e3345fb7ceb10757c5e4a9935dab/backend/pictures/reset-password.png)
### This is where i post  reset-password
![image](https://github.com/Johnlouiee/user-management-system/blob/baadc97cd3f9e3345fb7ceb10757c5e4a9935dab/backend/pictures/authenticata%20again.png)
### I authenticate again to see the jwToken
![image](https://github.com/Johnlouiee/user-management-system/blob/baadc97cd3f9e3345fb7ceb10757c5e4a9935dab/backend/pictures/part%202%20authenticate.png)
### refresh cookie 
![image](https://github.com/Johnlouiee/user-management-system/blob/d6df398ff38c14d749ec32721f4925aa47d044d8/backend/pictures/update%20user.png)
### This is where you update account with Postman
![image](https://github.com/Johnlouiee/user-management-system/blob/baadc97cd3f9e3345fb7ceb10757c5e4a9935dab/backend/pictures/account%20id.png)
### getting users by ID
![image](https://github.com/Johnlouiee/user-management-system/blob/baadc97cd3f9e3345fb7ceb10757c5e4a9935dab/backend/pictures/refresh%20token%20generate.png)
### This is where you see your referesh tokenn
![image](https://github.com/Johnlouiee/user-management-system/blob/477ca0cabbb58b623a9cb16082b4900fd9f959d5/backend/pictures/pr%20for%20justin.png)
### PR to merge main
![image](https://github.com/Johnlouiee/user-management-system/blob/477ca0cabbb58b623a9cb16082b4900fd9f959d5/backend/pictures/done%20merging%20dev2.jpg)
### DOne merging dev2











