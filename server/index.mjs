import express from 'express';
import rootRouter from './src/routes/rootRouter.mjs';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 4005

app.listen(PORT, () => {
    console.log('Server is running on port 4005');
});

//routes connections
app.use('/api/v1', rootRouter);

app.get('/', async (req, res) => {
    res.json({ message: 'Backend is running' });
})