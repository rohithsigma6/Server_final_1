const jwt = require('jsonwebtoken')
module.exports.verifyUser = (req, res, next) => {
    try {
        const token = req.header("token").split(" ")[1];
        console.log("token is" + token)
        
        const tokenDecrypted = jwt.verify(token,"QWERTY")
        req.body.userid = tokenDecrypted.userid
        next()
    } catch (err) {
        res.send({ success: false, message: err.message })
    }
}