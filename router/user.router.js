const router = require ("express").Router();
const UserController = require("../controller/user.controller");

router.post('/registration',UserController.register);
router.post('/login',UserController.loginUserController);
router.get('/findUsers',UserController.findusers);



module.exports=router;