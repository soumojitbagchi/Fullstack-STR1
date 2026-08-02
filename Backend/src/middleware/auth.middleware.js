import jwt from 'jsonwebtoken';

const authmiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token || 
            (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null) || 
            req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "User not logged in" })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        req.user = decodedToken
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Invalid or expired token" })
    }
}

export default authmiddleware;