import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import errorHandling from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Start backend: npm run dev
// http://localhost:3000

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use("/api", userRoutes);

// Error handling middleware
app.use(errorHandling);

// Server running
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

