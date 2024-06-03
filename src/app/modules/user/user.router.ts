import express from 'express';
// import { StudentController } from './student.controller';
import { userController } from './user.controller';

import { createStudentZodValidationSchema } from '../student/student.validation';
import validatedRequest from '../../middlewares/validatedRequest';

const router = express.Router();

router.post(
  '/create-student',
  validatedRequest(createStudentZodValidationSchema),
  userController.createStudent,
);

export const UserRoutes = router;
