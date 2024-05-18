import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.router';

const app: Application = express();
app.use(express.json());
app.use(cors());

//application routes
//api/v1/students/create-students
app.use('/api/v1/students', StudentRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
};
app.get('/', getAController);

export default app;
