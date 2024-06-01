import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { StudentRoutes } from '../modules/student/student.router';
import path from 'path';

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
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

router.use('/students', StudentRoutes);
router.use('/users', UserRoutes);

export default router;
