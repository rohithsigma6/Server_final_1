const router = require("express").Router();

const controller  = require('../controllers/index')
const {verifyUser }= require('../../../middlewares/auth')

router.post('/createuser',controller.createUser)
router.post("/loginuser",controller.Login)
router.post("/verifyusertoken",verifyUser,controller.verifyUserToken)
module.exports = router;