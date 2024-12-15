const UserService=require("../services/user.services");

exports.register = async(req,res)=>{
    try {
        const {username,email,password,role,department,publicKey,profilePicture} =req.body;

        const newUser = await UserService.registerUser(username, email, password, role, department, publicKey,profilePicture);
        res.status(201).json({ status: true, data: newUser });
        
    } catch (error) {
        res.status(400).json({ status: false, message: err.message });
    }
}

exports.loginUserController = async(req,res)=>{
    try {
        const { email, password } = req.body;

        // Ensure email and password are provided
        if (!email || !password) {
            return res.status(400).json({ status: false, message: 'Email and password are required' });
        }

        // Call the login service
        const loginResult = await UserService.loginUser(email, password);

        // Respond with the token and user details
        return res.status(200).json(loginResult);
    } catch (err) {
        // If an error occurs (e.g., wrong password or email), return an error
        return res.status(400).json({ status: false, message: err.message });
    }
}