const jwt = require('jsonwebtoken');

const authmiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "User not logged in" })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        req.user = decodedToken
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports=authmiddleware