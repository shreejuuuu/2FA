function validateNepaliPhoneNumber(phoneNumber) {
    const regex = /^(\+977\s?)?(98|97)\d{8}$/;
    return regex.test(phoneNumber);
}

function sendVerificationCode() {
    const phoneNumber = document.getElementById('phoneNumber').value;

    if (!validateNepaliPhoneNumber(phoneNumber)) {
        document.getElementById('result').innerText = "Invalid phone number!";
        return;
    }

    // Here, you'd typically send the phone number to your server to send the code
    // For demonstration purposes, we'll just simulate this
    fetch('/send-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('result').innerText = "Verification code sent!";
            document.getElementById('verification-section').style.display = 'block';
        } else {
            document.getElementById('result').innerText = "Failed to send verification code.";
        }
    })
    .catch(error => console.error('Error:', error));
}

function verifyCode() {
    const verificationCode = document.getElementById('verificationCode').value;

    // Simulate sending the code to the server for verification
    fetch('/verify-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ verificationCode })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('result').innerText = "Phone number verified successfully!";
        } else {
            document.getElementById('result').innerText = "Verification failed!";
        }
    })
    .catch(error => console.error('Error:', error));
}
