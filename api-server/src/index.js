import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import aiChatRoutes from './routes/aiChatRoutes.js';
import errorHandling from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Start backend: npm run dev
// http://localhost:3000

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", aiChatRoutes);

// Error handling middleware
app.use(errorHandling);

// Server running
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

