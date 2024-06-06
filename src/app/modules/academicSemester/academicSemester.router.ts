import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validatedRequest from '../../middlewares/validatedRequest';
import { AcademicSemesterValidation } from './academicSemester.Validation';
// import { StudentController } from './student.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validatedRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.createAcademicSemester,
);
router.get('/', academicSemesterController.getAllSemester);

// get single semester
router.get('/:semesterId', academicSemesterController.getOneSemester);

router.patch(
  '/:semesterId',
  validatedRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  academicSemesterController.updateSemester,
);

// //find one student
// router.get('/:studentId', StudentController.getSingleStudent);
// //deleted student
// router.delete('/:studentId', StudentController.deletedStudent);
// router.get('/', StudentController.getAllStudents);
export const AcademicSemesterRoutes = router;
