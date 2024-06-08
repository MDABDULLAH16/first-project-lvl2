import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { StudentRoutes } from '../modules/student/student.router';
import path from 'path';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.router';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.router';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.router';

const router = Router();

const moduleRouter = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

// router.use('/students', StudentRoutes);
// router.use('/users', UserRoutes);

export default router;
