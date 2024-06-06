import { Schema, model } from 'mongoose';
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constants';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: AcademicSemesterCode,
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  { timestamps: true },
);

AcademicSemesterSchema.pre('save', async function (next) {
  const isExistingAcademicSemester = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isExistingAcademicSemester) {
    throw new Error('This Semesters already Exist');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
