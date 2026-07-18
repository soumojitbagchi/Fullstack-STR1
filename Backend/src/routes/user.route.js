const authMiddleware = require('../middleware/auth.middleware');


const userRoutes = express.Router();

userRoutes.post('/user', authMiddleware, 'name of controller')
