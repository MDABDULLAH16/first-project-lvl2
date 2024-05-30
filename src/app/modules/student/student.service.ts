import { error } from 'console';
import { TStudent } from './student.interface';
import { Student } from './student.model';

//create student
const createStudentIntoDB = async (studentData: TStudent) => {
  //this is for statics methods
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('user Already exists');
  }
  const result = await Student.create(studentData); //build in static method

  // const student = new Student(studentData); //create an instance

  //user existing handler
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('user Already exists');
  // }
  // const result = await student.save(); //build in instance method
  return result;
};

//get student

const getAllStudentFromDb = async () => {
  const result = await Student.find();
  return result;
};

//get single item from db
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentFromDb,
  getSingleStudentFromDB,
};
