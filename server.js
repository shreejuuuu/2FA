const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());

// Twilio configuration
const accountSid = 'your_account_sid';  // Your Account SID from www.twilio.com/console
const authToken = 'your_auth_token';    // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

// Store codes temporarily (in a production app, use a database)
const verificationCodes = {};

app.post('/send-code', (req, res) => {
    const { phoneNumber } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the verification code (linked to the phone number)
    verificationCodes[phoneNumber] = verificationCode;

    // Send the verification code via SMS
    client.messages.create({
        body: `Your verification code is ${verificationCode}`,
        to: phoneNumber,
        from: '+1234567890'  // Your Twilio phone number
    })
    .then(message => res.json({ success: true }))
    .catch(error => res.json({ success: false, error }));
});

app.post('/verify-code', (req, res) => {
    const { verificationCode } = req.body;

    const phoneNumber = Object.keys(verificationCodes).find(number => verificationCodes[number] === verificationCode);

    if (phoneNumber) {
        // Verification successful
        delete verificationCodes[phoneNumber];  // Remove the code after verification
        res.json({ success: true });
    } else {
        // Verification failed
        res.json({ success: false });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
