import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  //semester name ---> code
  type TAcademicSemesterMapper = {
    [key: string]: string;
  };

  const academicSemesterMapper: TAcademicSemesterMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

  if (
    academicSemesterMapper[payLoad.name] !==
    academicSemesterMapper[payLoad.code]
  ) {
    throw new Error('Semester code is invalided');
  }

  const result = await AcademicSemester.create(payLoad);
  return result;
};

export const academicSemesterService = {
  createAcademicSemesterIntoDB,
};
