// src/server.ts
import express, { Request, Response } from 'express';
import usersRouter from './routes/users-routes';
import authRouter from './routes/authentication-routes';
import nutritionLoggerRouter from './routes/nutrition-logger-routes';
import { errorHandler } from './middlewares';
import cors from 'cors';
import progressLoggerRouter from './routes/progress-logger-routes';
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: false }));

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   // res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

const port = process.env.PORT || 5000;

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/nutrition-logger', nutritionLoggerRouter);
app.use('/progress-logger', progressLoggerRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1 style="color:green">Fit-Tracker-API</h1>');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
