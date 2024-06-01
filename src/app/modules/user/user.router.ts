import express from 'express';
// import { StudentController } from './student.controller';
import { userController } from './user.controller';

const router = express.Router();

router.post('/create-student', userController.createStudent);

export const UserRoutes = router;
