const usermodel = require('../modle/user.modle'); // Ensure the correct path
const bcrypt = require('bcrypt'); // Import bcrypt to hash passwords
const jwt = require('jsonwebtoken');

class UserService {
    static async registerUser(username, email, password, role, department, publicKey, profilePicture = '') {
        try {
            // Check if required fields are missing
            if (!username || !email || !password || !publicKey) {
                throw new Error('Missing required fields');
            }

            // Hash the password before storing it
            const passwordHash = await bcrypt.hash(password, 10);

            // Create a new user instance with the required fields
            const newUser = new usermodel({
                username,
                email,
                passwordHash, // Store the hashed password
                role,
                department: role === 'student' ? null : department, // Optional if role is student
                publicKey,
                profilePicture, // Optional
            });

            // Save the user to the database and return the saved user document
            return await newUser.save();
        } catch (err) {
            // Handle validation and other errors
            throw err;
        }
    }

    static async loginUser(email, password) {
        try {
            // Check if user exists with the provided email
            const user = await usermodel.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            // Compare the provided password with the stored password hash
            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            // If password is valid, generate a JWT token
            const token = jwt.sign(
                {
                    userId: user._id,
                    username: user.username,
                    role: user.role
                },
                'your_jwt_secret', // Use a secret key in a .env file or config
                { expiresIn: '1h' } // Token will expire in 1 hour
            );

            // Return the token and user data (you can customize this)
            return {
                status: true,
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserService;
