import { academicSemesterMapper } from './academicSemester.constants';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  if (academicSemesterMapper[payLoad.name] !== payLoad.code) {
    throw new Error('Semester code is invalided');
  }

  const result = await AcademicSemester.create(payLoad);
  return result;
};

//get all semesters

const getAllSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
//get all semesters

const getOneSemesterFromDB = async (_id: string) => {
  const result = await AcademicSemester.findById({ _id });
  return result;
};

const updateSemester = async (
  id: string,
  payLoad: Partial<TAcademicSemester>,
) => {
  if (
    payLoad.name &&
    payLoad.code &&
    academicSemesterMapper[payLoad.name] !== payLoad.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    payLoad,
    { new: true },
  );
  return result;
};
export const academicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllSemesterFromDB,
  getOneSemesterFromDB,
  updateSemester,
};
