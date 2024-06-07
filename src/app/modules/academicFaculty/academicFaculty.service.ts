import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payLoad: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payLoad);
  return result;
};

const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleAcademicFacultyFromDB = async (_id: string) => {
  const result = await AcademicFaculty.findById({ _id });
  return result;
};
const updateAcademicFacultyOnDB = async (
  _id: string,
  payLoad: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id }, payLoad, {
    new: true,
  });
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyOnDB,
};
