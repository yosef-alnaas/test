const UserService = require("../services/user.services");

exports.register = async (req, res) => {
    try {
        const { username, email, password, role, department, publicKey, profilePicture } = req.body;

        const newUser = await UserService.registerUser(username, email, password, role, department, publicKey, profilePicture);
        // Return a consistent response with 'status' and a message
        return res.status(201).json({ 
          status: true, 
          message: "User registered successfully", 
          data: newUser 
        });
        
    } catch (error) {
        // Use 'error' instead of 'err'
        return res.status(400).json({ status: false, message: error.message });
    }
}

exports.loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ensure email and password are provided
        if (!email || !password) {
            return res.status(400).json({ status: false, message: 'Email and password are required' });
        }

        // Call the login service
        const loginResult = await UserService.loginUser(email, password);

        // Expecting loginResult to contain { success: boolean, token: string, ... }
        if (loginResult && loginResult.status === true) {
            // Return consistent success response
            return res.status(200).json({
                status: true,
                token: loginResult.token,
                message: "Login successful",
                id: loginResult.user.id
            });
        } else {
            // If loginResult doesn't have success or token, handle it
            return res.status(400).json({ 
                status: false, 
                message: loginResult.message || "Login failed. Please check your credentials." 
            });
        }
        
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
}

exports.findusers = async (req, res) => {
    try {
      const users = await UserService.findUsers();
  
      // Convert ObjectId to string for each user
      const sanitizedUsers = users.map(u => {
        return {
          ...u,
          _id: u._id.toString() // Convert ObjectId to a simple string
        };
      });
  
  
      return res.status(200).json({
        status: true,
        data: sanitizedUsers
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: "Server error" });
    }
  };

  exports.savekey = async (req,res)=>{
    try {
      const { _id, publicKey } = req.body;
      const result= await UserService.savekey(_id,publicKey);
      return res.status(200).json(result);
      
    } catch (error) {
      return res.status(400).json({ status: false, message: error.message });
    }
  }
        
        
        

