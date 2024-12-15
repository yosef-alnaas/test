const KeyService=require("../services/keys.services");

exports.SendKey = async(req,res)=>{
    try {
        const { recipientId, encryptedAESKey } = req.body;
        // Forward the encrypted AES key to the recipient
        await KeyService.sendToRecipient(recipientId, encryptedAESKey);
        res.status(200).send('AES key forwarded');
  
    } catch (error) {
        res.status(400).json({ status: false, message: err.message });
    }
}