import express from 'express';

const app = express();
app.use(express.json());

app.listen(4005, () => {
    console.log('Server is running on port 4005');
});

app.get('/', async (req, res) => {
    res.json({ message: 'Backend is running' });
})