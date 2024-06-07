import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent ? lastStudent.id.substring(6) : undefined;
};

// year code 4 digit number
export const generateStudentId = async (payLoad: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();

  //2030 01 0001
  const lastSemesterCode = lastStudentId?.substring(4, 6);
  const lastSemesterYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payLoad.code;
  const currentSemesterYear = payLoad.year;
  if (
    lastStudentId &&
    lastSemesterCode === currentSemesterCode &&
    lastSemesterYear === currentSemesterYear
  ) {
    currentId = lastStudentId?.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;
  return incrementId;
};
