const router = require ("express").Router();
const UserController = require("../controller/user.controller");

router.post('/registration',UserController.register);
router.post('/login',UserController.loginUserController);
router.get('/findUsers',UserController.findusers);
router.post('/savekey',UserController.savekey);
router.get('/getkey',UserController.sendkey);



module.exports=router;