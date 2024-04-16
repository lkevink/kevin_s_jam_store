const express = require('express')
const server = express()
const dayjs = require('dayjs')
const { request, response } = require('express')
const mysql = require('mysql2');
const port = process.env.PORT || 5000;
const host = 'localhost';
const crypto = require('crypto');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: './secret/secret.env' });



server.use(cors());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    else
        console.log('Connected to MySQL server');
});

connection.query('SELECT * FROM customer', function (error, results, fields) {
    if (error) throw error;
    else
        console.log(results);
});




server.set('view engine', 'ejs')
server.set('views', 'page')



let path = './page'
let visitorCount = 0;
let visitCount =0;



server.use(express.static('css'))
server.use(express.static('javascript'))
server.use(express.static('page'))

server.use(express.json());
server.use(express.urlencoded({extended:true}))




server.use((request,response,next)=>{
    visitorCount++;
    visitCount++;
    console.log(`New Visitor : From ${request.hostname} | Request ${request.path} - Visitors: +${visitorCount} - Total Visits: ${visitCount}`)
    visitorCount--;
    visitCount += visitorCount;
    next()
})

//ejs

server.get('/', (request, response)=>{
    let today =
    `
    Date:
    ${dayjs().date()} /
    ${dayjs().month() + 1} /
    ${dayjs().year()}
    `
    
    let now = 
    `
    Time:
    ${dayjs().second()} :
    ${dayjs().minute()} :
    ${dayjs().hour()}
    `
    
    
    response.render('index', {
        projectName: "Kevin's Jam Store",
        title: ' - Home',
        date: today,
        time: now,
        copyYear: (dayjs().year())
    })
})

server.get('/home', (request, response)=>{
    let today =
    `
    Date:
    ${dayjs().date()} /
    ${dayjs().month() + 1} /
    ${dayjs().year()}
    `
    
    let now = 
    `
    Time:
    ${dayjs().second()} :
    ${dayjs().minute()} :
    ${dayjs().hour()}
    `
    
    response.render('index', {
        projectName: "Kevin's Jam Store",
        title: ' - Home',
        date: today,
        time: now,
        copyYear: (dayjs().year())
    })
})

server.get('/admin', (request, response)=>{
    
    let today =
    `
    Date:
    ${dayjs().date()} /
    ${dayjs().month() + 1} /
    ${dayjs().year()}
    `
    
    let now = 
    `
    Time:
    ${dayjs().second()} :
    ${dayjs().minute()} :
    ${dayjs().hour()}
    `
    
    
    
    response.render('index', {
        projectName: "Kevin's Jam Store",
        title: ' - Home',
        date: today,
        time: now,
        copyYear: (dayjs().year())
    })
})

server.get('/about', (request, response)=>{
    response.render('about', {
        projectName: "Kevin's Jam Store",
        title: ' - About',
        copyYear: (dayjs().year())
    })
})

server.get('/login', (request, response)=>{
    response.render('login', {
        projectName: "Kevin's Jam Store",
        title: ' - Login',
        copyYear: (dayjs().year())
    })
})

server.post('/login', (request,response)=>{
    console.log(request.body)
    console.log('Email: ' + request.body.email)
    console.log('Password: ' + request.body.password)
})








//React

server.get('/api/productList', (request, response) => 
    {
        const productListMySQL = 'SELECT * FROM product'
        
        
        connection.query(productListMySQL, (error, results) => 
            {
                if (error){
                    console.error('Error querying MySQL:', error)
                    return response.status(500).json({ error: 'Internal server error' });
                }
                
                else{
                    response.setHeader('Content-Type', 'application/json');
                    response.json(results)
                }

            }
        )
    }

)

server.get('/api/checkout', (request, response) => 
    {
        const productListMySQL = 'SELECT * FROM product'
        
        
        connection.query(productListMySQL, (error, results) => 
            {
                if (error){
                    console.error('Error querying MySQL:', error)
                    return response.status(500).json({ error: 'Internal server error' });
                }
                
                else{
                    response.setHeader('Content-Type', 'application/json');
                    response.json(results)
                }

            }
        )
    }

) 



const encrypt = (decryptedText) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.AES_ENCRYPTION_KEY, 'hex'), Buffer.from(process.env.AES_ENCRYPTION_IV, 'hex'));
    let encrypted = cipher.update(decryptedText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};


server.post('/api/register', (request, response) => {
    const { email, password, fullName, phone, birthDay, birthMonth, birthYear, sex, address } = request.body;

    if (!process.env.AES_ENCRYPTION_KEY || !process.env.AES_ENCRYPTION_IV) {
        return response.status(500).send('Encryption key or IV is missing');
    }

    const encryptedPassword = encrypt(password, process.env.AES_ENCRYPTION_KEY, process.env.AES_ENCRYPTION_IV);


    const newCustomer = {
        customer_email: email,
        customer_password: encryptedPassword,
        customer_full_name: fullName,
        customer_phone: phone,
        customer_birth_day: birthDay,
        customer_birth_month: birthMonth,
        customer_birth_year: birthYear,
        customer_sex: sex,
        customer_address: address,
        customer_register_time: new Date()
    };


    const query = 'INSERT INTO customer SET ?';
    connection.query(query, newCustomer, (error, results) => {
        if (error) {
            console.error('There was an error!', error);
            return response.status(500).send('Internal Server Error');
        }
        console.log('User registered with ID:', results.insertId);
        response.status(201).send({ msg: 'Register successfully!', customerId: results.insertId });
    });
});

const decrypt = (encryptedText) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.AES_ENCRYPTION_KEY, 'hex'), Buffer.from(process.env.AES_ENCRYPTION_IV, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

server.post('/api/login', (request, response) => {
    const { email, password } = request.body;

    const query = 'SELECT customer_password FROM customer WHERE customer_email = ?';
    connection.query(query, [email], (error, results) => {
        if (error) {
            console.error('There was an error!', error);
            return response.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return response.status(401).send('Authentication failed: user not found.');
        }

    const encryptedPassword = results[0].customer_password;
    const decryptedPassword = decrypt(encryptedPassword);

        if (decryptedPassword !== password) {
            return response.status(401).send('Authentication failed: incorrect password.');
        }

    const customerData = {
        customer_id: results[0].customer_id,
            
    };

    response.status(200).send({ msg: 'Login successful!', customer: customerData });
    });
});


const generateOneTimePasscode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
};

const ownerEmailService = process.env.OWNER_EMAIL_SERVICE;
const ownerEmailAccount = process.env.OWNER_EMAIL_ACCOUNT; 
const ownerEmailPassword = process.env.OWNER_EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: ownerEmailService,
    auth: {
        user: ownerEmailAccount,
        pass: ownerEmailPassword
    }
});

const sendOneTimePasscode = (oneTimePasscode, email) => {
    const mailOptions = {
        from: ownerEmailAccount,
        to: email,
        subject: 'Your One-Time Passcode',
        text: `Your one-time passcode is: ${oneTimePasscode}`,
        html: `<p>Your one-time passcode is: <b>${oneTimePasscode}</b></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error sending OTP to ${email}:`, error);
        } else {
            console.log(`OTP sent to ${email}: ${info.response}`);
        }
    });
};


const validateEmailMiddleware = [
    body('email').isEmail().withMessage('Invalid email address'),
    (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


server.post('/api/sendOneTimePasscode', validateEmailMiddleware, (request, response) => {
    const { email } = request.body;
    const oneTimePasscode = generateOneTimePasscode();
    const oneTimePasscodeExpiration = new Date();
    oneTimePasscodeExpiration.setMinutes(oneTimePasscodeExpiration.getMinutes() + 10); 


    const query = 'UPDATE customer SET customer_one_time_passcode = ?, customer_one_time_passcode_expiration = ? WHERE customer_email = ?';
    connection.query(query, [oneTimePasscode, oneTimePasscodeExpiration, email], (error, results) => {
        if (error) {
            return response.status(500).json({ message: 'Error updating OTP', error });
        }
        if (results.affectedRows === 0) {
            return response.status(404).json({ message: 'Email not found' });
        }
        sendOneTimePasscode(oneTimePasscode, email); 
        response.json({ message: 'OTP sent successfully' });
    });
});


server.post('/api/verifyOneTimePasscode', validateEmailMiddleware, (request, response) => {
    const { email, oneTimePasscode } = request.body;

    const query = 'SELECT * FROM customer WHERE customer_email = ? AND customer_one_time_passcode = ? AND customer_one_time_passcode_expiration > NOW()';
    connection.query(query, [email, oneTimePasscode], (error, results) => {
        if (error) {
            return response.status(500).json({ message: 'Error verifying OTP', error });
        }
        if (results.length === 0) {
            return response.status(400).json({ message: 'Invalid or expired OTP' });
        }
        response.json({ message: 'OTP verified successfully' });
    });
});


server.post('/api/updatePassword', [
    ...validateEmailMiddleware,
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const { email, newPassword } = request.body;

    if (!process.env.AES_ENCRYPTION_KEY || !process.env.AES_ENCRYPTION_IV) {
        console.error('Encryption key or IV is missing');
        return response.status(500).send('Internal Server Error');
    }

    let encryptedNewPassword;
    try {
        encryptedNewPassword = encrypt(newPassword, process.env.AES_ENCRYPTION_KEY, process.env.AES_ENCRYPTION_IV);
    } catch (error) {
        console.error('Error encrypting password:', error);
        return response.status(500).send('Internal Server Error');
    }

    const query = 'UPDATE customer SET customer_password = ? WHERE customer_email = ?';
    connection.query(query, [encryptedNewPassword, email], (error, results) => {
        if (error) {
            console.error('Error updating password in database:', error);
            return response.status(500).json({ message: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return response.status(404).json({ message: 'Email not found' });
        }
        response.json({ message: 'Password updated successfully' });
    });
});

server.get('/api/customerInformation', (request, response) => 
    {
        const customerInformationMySQL = 'SELECT * FROM customer'
        
        
        connection.query(customerInformationMySQL, (error, results) => 
            {
                if (error){
                    console.error('Error querying MySQL:', error)
                    return response.status(500).json({ error: 'Internal server error' });
                }
                
                else{
                    response.setHeader('Content-Type', 'application/json');
                    response.json(results)
                }

            }
        )
    }

)









server.use((request, response)=>{
    response.render('404', {
        projectName: "Kevin's Jam Store",
        title: ' - Error 404 - Not Found',
        copyYear: (dayjs().year())
    })
    response.status(404)
})



/* connection.end((error) => {
    if (error) {
        console.error('Error closing connection:', error);
        return;
    }
    else
        console.log('Connection closed');
}); */

server.listen(port, host, () => {
    console.log(`Server is running on port ${port}`);
});



