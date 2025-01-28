import express from 'express';
import rootRouter from './src/routes/rootRouter.mjs';
import cors from 'cors';
import 'dotenv/config';
import DB from './src/db/db.mjs'; // Import DB for connection check

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4005;

//Check DB connection
const checkDBConnection = async () => {
  try {
    await DB.$connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
 };

//Call the checkDBConnection function
checkDBConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// routes
app.use('/api/v1', rootRouter);

app.get('/', async (req, res) => {
  res.json({ message: 'Backend is running' });
});
