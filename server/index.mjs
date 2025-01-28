import express from 'express';
import rootRouter from './src/routes/rootRouter.mjs';
import cors from 'cors';
import videoRouter from './src/routes/videoRouter.mjs';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1/videos', videoRouter);

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes connections
app.use('/api/v1', rootRouter);

app.get('/', async (req, res) => {
  res.json({ message: 'Backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error Middleware:", err.stack || err);
  
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    error: err.error || 'Something went wrong!',
  });
});
