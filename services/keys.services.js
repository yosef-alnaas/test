const usermodel = require('../modle/user.modle'); // Ensure the correct path


class KeyServices
{
    static async sendToRecipient(recipientId, encryptedAESKey)
    {
        try {
            const user = await usermodel.findById(recipientId);
            
            return {
                status: true,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            };
            
        } catch (error) {
            throw error;
        }
    }

}

module.exports = KeyServices;