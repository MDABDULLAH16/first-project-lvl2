import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

//get student

const getAllStudentFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};

//get single item from db

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentFromDb,
  getSingleStudentFromDB,
};
