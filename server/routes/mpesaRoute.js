router.post("/callback/:orderId", async (req, res) => {
    try {
        const {orderId} =req.params;
        
        //  capture the incoming JSON payload from Safaricom
        const callbackData = req.body;
        console.log("Incoming Safaricom Payload:", JSON.stringify(callbackData, null, 2));

        // SCheck if the payload structure is what we expect
        if (!callbackData || !callbackData.Body || !callbackData.Body.stkCallback) {
            return res.status(400).json({ error: "Invalid M-Pesa payload structure" });
        }

        const stkDetails = callbackData.Body.stkCallback;

        // 3. Fetch the order model from MongoDB an
        const Order = require("../models/Order"); 
        const order = await Order.findById(orderId);
        
        if (!order) {
            console.log(`Order ID ${orderId} not found in database.`);
            return res.status(404).send("Order not found");
        }


        // 4. Intercept Failed Payments (e.g. user cancelled prompt, or insufficient funds)
        if (stkDetails.ResultCode !== 0) {
            order.paymentStatus = "Unpaid";
            await order.save();


            // Notify the specific client browser/mobile app via sock
            
            console.log(`[M-PESA FAILED] Order ${orderId}payment failed. Reason: ${stkDetails.ResultDesc}`);
            return res.status(200).json({ ResultCode: 0, ResultDesc: "Callback processed successfully" });
        }

        // 5. Handle a Successful Transaction (ResultCode is 0)
        order.paymentStatus = "Paid"; 
        

        // Extract the unique M-Pesa Receipt Number from Safaricom metadata array
        if (stkDetails.CallbackMetadata && stkDetails.CallbackMetadata.Item) {
            const metadataItems = stkDetails.CallbackMetadata.Item;
            const receiptObj = metadataItems.find(item => item.Name === "MpesaReceiptNumber");
            if (receiptObj) {
                order.transactionId = receiptObj.Value; // e.g., QKL92NJ71X
            }
        }
        
        await order.save();

        console.log(`[M-PESA SUCCESS] Order ${orderId} Paid. Receipt: ${order.transactionId}`);

        // MANDATORY ACKNOWLEDGEMENT RESPONSE FOR SAFARICOM DARAJA
        return res.status(200).json({ ResultCode: 0, ResultDesc: "Callback processed successfully" });

    } catch (error) {
        console.error("Callback Error Handler System Crash:", error.message);
        return res.status(500).send("Internal Server Callback Error");
    }
});

module.exports = router;
