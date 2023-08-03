const { User } = require('../index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports.createUser = async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password) {
            return res.status(404).json({ message: "Please fill all the fields", success: false })
        }
        const uniqueUser = await User.findOne({ email })
        if (uniqueUser) {
            return res.status(404).json({ message: "Email already in use", success: false })
        }
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const response = await User.create({
            firstName, lastName, email, password: hashedPassword
        })
        if (!response) {
            return res.status(404).json({ message: "Internal server error", success: false })
        }
        return res.status(200).json({ message: "Registration successful", success: true })


    } catch (err) {
        return res.status(404).json({ message: err, success: false })
    }
}


module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({ message: "Please fill all the fields", success: false })
        }
        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.status(404).json({ message: "User not registered", success: false })
        }
        const passwordMatch = await bcrypt.compare(password, userExists.password)
        if (!passwordMatch) {
            return res.status(404).json({ message: "Incorrect password", success: false })
        }
        //TODO - add env
        const token = jwt.sign({ userid: userExists._id }, "QWERTY");
        return res.status(200).json({ message: "Login successfull", success: true, token })


    } catch (err) {
        return res.status(404).json({ message: err, success: false })
    }
}


module.exports.verifyUserToken = async (req, res) => {

    try {

        if (req.body.userid) {
            return res.status(200).json({ message: "user verified", success: true })
        }
        else {
            return res.status(404).json({ message: "user not verified", success: false })
        }
    }
    catch (err) {

        return res.status(404).json({ message: err, success: false })
    }

}
