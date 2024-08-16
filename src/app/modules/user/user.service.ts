import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utilities';
import mongoose from 'mongoose';

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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Check if admissionSemester is null
    if (!admissionSemester) {
      throw new Error('Admission semester not found');
    }
    //set manually id
    userData.id = await generateStudentId(admissionSemester);

    //create a user
    const newUser = await User.create([userData], { session }); //build in static method

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user');
    }
    payLoad.id = newUser[0].id; //unique or embed id
    payLoad.user = newUser[0]._id; // reference id

    const newStudent = await Student.create([payLoad], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;

    // return newUser;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const userServices = {
  createStudentIntoDB,
};
