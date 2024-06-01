import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// router.post('/create-student', StudentController.createStudent);

//find one student
router.get('/:studentId', StudentController.getSingleStudent);
//deleted student
router.delete('/:studentId', StudentController.deletedStudent);
router.get('/', StudentController.getAllStudents);
export const StudentRoutes = router;
