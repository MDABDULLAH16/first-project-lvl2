import config from '../../config';
// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utilities';

//create student
const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  //this is for statics methods
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error('user Already exists');
  //   }

  //create a user object for set role and password
  const userData: Partial<TUser> = {};

  //if user password not given, use default password
  userData.password = password || (config.default_password as string);
  //   if (!password) {
  //     password = config.default_password as string;
  //   } else {
  //     user.password = password;
  //   }

  //set student role
  userData.role = 'student';

  //find academic semester info with semester id

  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester,
  );

  // Check if admissionSemester is null
  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }
  //set manually id
  userData.id = await generateStudentId(admissionSemester);

  //create a user
  const newUser = await User.create(userData); //build in static method

  //create a student
  if (Object.keys(newUser).length) {
    payLoad.id = newUser.id; //unique or embed id
    payLoad.user = newUser._id; // reference id

    const newStudent = await Student.create(payLoad);
    return newStudent;
  }

  // const student = new Student(studentData); //create an instance

  //user existing handler
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('user Already exists');
  // }
  // const result = await student.save(); //build in instance method
  return newUser;
};

export const userServices = {
  createStudentIntoDB,
};
