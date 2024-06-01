import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.router';
import { UserRoutes } from './app/modules/user/user.router';
import { error } from 'console';
import globalErrorHandling from './app/middlewares/globalErrorHandling';

const app: Application = express();
app.use(express.json());
app.use(cors());

//application routes
//api/v1/students/create-students
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
};
app.get('/', getAController);

app.use(globalErrorHandling);

export default app;
