import { z } from 'zod';

// Define the month type
const MonthEnum = z.enum([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]);

// Define the academic semester name enum
const SemesterNameEnum = z.enum(['Autumn', 'Summer', 'Fall']);
// Define the academic semester code enum
const SemesterCodeEnum = z.enum(['01', '02', '03']);

// Define the academic semester schema
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    name: SemesterNameEnum,
    code: SemesterCodeEnum,
    year: z.string({
      required_error: 'Year is required.',
    }),
    startMonth: MonthEnum,
    endMonth: MonthEnum,
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
