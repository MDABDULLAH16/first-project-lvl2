import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentController.createStudent);

router.get('/', StudentController.getAllStudents);

//find one student

router.get('/:studentId', StudentController.getSingleStudent);
export const StudentRoutes = router;
