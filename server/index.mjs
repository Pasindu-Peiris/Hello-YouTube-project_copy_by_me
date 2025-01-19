import express from 'express';
import rootRouter from './src/routes/rootRouter.mjs';

const app = express();
app.use(express.json());

app.listen(4005, () => {
    console.log('Server is running on port 4005');
});

//routes connections
app.use('/api/v1', rootRouter);

app.get('/', async (req, res) => {
    res.json({ message: 'Backend is running' });
})