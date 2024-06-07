import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validatedRequest from '../../middlewares/validatedRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validatedRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  academicFacultyController.createAcademicFaculty,
);
router.patch(
  '/:facultyId',
  validatedRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  academicFacultyController.updateAcademicFaculty,
);

router.get('/', academicFacultyController.getAcademicFaculty);

router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty);

export const AcademicFacultyRoutes = router;
