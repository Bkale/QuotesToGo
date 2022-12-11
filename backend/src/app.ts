import express from 'express';
import cors from 'cors';
import { applicationRouter } from './application.router';

const PORT: number = process.env.PORT
    ? parseInt(process.env.PORT as string, 10)
    : 5001;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/applications', applicationRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
