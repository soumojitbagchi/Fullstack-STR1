import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"], credentials: true }));
app.post('/api/auth/register', (req, res) => res.send('ok'));
app.listen(8081, () => console.log('started'));
