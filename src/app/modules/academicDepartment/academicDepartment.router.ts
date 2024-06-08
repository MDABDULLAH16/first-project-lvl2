import express from 'express';

import validatedRequest from '../../middlewares/validatedRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  validatedRequest(
    academicDepartmentValidation.createAcademicDepartmentValidation,
  ),
  academicDepartmentController.createAcademicDepartment,
);
router.patch(
  '/:departmentId',
  validatedRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidation,
  ),
  academicDepartmentController.updateAcademicDepartment,
);

router.get('/', academicDepartmentController.getAllAcademicDepartment);

router.get(
  '/:departmentId',
  academicDepartmentController.getSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
