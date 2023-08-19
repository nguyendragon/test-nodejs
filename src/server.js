import express from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.end('Hello world');
});

app.use((req, res, next) => {
    next(createHttpError.NotFound('This route does not exist'));
});

app.use((err, req, res, next) => {
    res.json({
        satus: err.status || 500,
        message: err.message,
    });
});

mongoose.connect('mongodb://127.0.0.1:27017/web503').then(() => console.log('Connect to DB successfully'));

app.listen(port, function () {
    console.log(`Server is running on ${port}`);
});
