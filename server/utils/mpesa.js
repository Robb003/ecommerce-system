// utils/mpesa.js
const axios = require("axios");

// 1. Generates Safaricom compliant Timestamp
const generateTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

//  get the access token 
const getMpesaToken = async () => {
    const secret = process.env.MPESA_SECRET_KEY;
    const consumer = process.env.MPESA_CONSUMER_KEY;

    if (!secret || !consumer) {
        throw new Error("M-Pesa API Consumer Key or Secret Key missing in environment variables.");
    }

    const auth = Buffer.from(`${consumer.trim()}:${secret.trim()}`).toString("base64");
    
    const response = await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
            headers: { Authorization: `Basic ${auth}` }
        }
    );
    return response.data.access_token;
};

const triggerStkPush = async (phoneNumber, totalPrice, orderId, orderNumber) => {
    // Fetches the token
    const token = await getMpesaToken();

    // Cleans up phone formats into 254...
    let rawPhone = phoneNumber.toString().trim();
    if (rawPhone.startsWith("254")) {
        rawPhone = rawPhone.substring(3);
    } else if (rawPhone.startsWith("0")) {
        rawPhone = rawPhone.substring(1);
    }
    const fullPhoneNumber = `254${rawPhone}`;

    const shortcode = process.env.MPESA_PAYBILL;
    const passKey = process.env.MPESA_PASSKEY;
    const timestamp = generateTimestamp();
    const password = Buffer.from(shortcode + passKey + timestamp).toString("base64");

    // Fires request out to Safaricom Sandbox
    const response = await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {
            BusinessShortCode: shortcode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: Math.ceil(totalPrice), // Enforces Math.ceil onto the amount variable cleanly
            PartyA: fullPhoneNumber,
            PartyB: shortcode,
            PhoneNumber: fullPhoneNumber,
            CallBackURL: `${process.env.MPESA_CALLBACK_URL}/api/mpesa/callback/${orderId}`,
            AccountReference: orderNumber,
            TransactionDesc: `Payment for ${orderNumber}`
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    return response.data; // Delivers Safaricom's IDs back to whoever called this function
};

module.exports = { triggerStkPush };
