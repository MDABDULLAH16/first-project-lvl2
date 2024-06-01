import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

//create student
const createStudentIntoDB = async (password: string, studentData: TStudent) => {
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

  //set manually id
  userData.id = '203010001';

  //create a user
  const newUser = await User.create(userData); //build in static method

  //create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id; //unique or embed id
    studentData.user = newUser._id; // reference id

    const newStudent = await Student.create(studentData);
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
