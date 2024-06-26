import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  middleName: z
    .string()
    .max(20, 'Middle name cannot exceed 20 characters.')
    .optional(),
  lastName: z.string().min(1, 'Last name is required.'),
});

const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1, "Father's name is required.")
    .max(20, "Father's name cannot exceed 20 characters."),
  fatherContact: z.string().min(1, "Father's contact is required."),
  fatherOccupation: z.string().min(1, "Father's occupation is required."),
  motherName: z
    .string()
    .min(1, "Mother's name is required.")
    .max(20, "Mother's name cannot exceed 20 characters."),
  motherContact: z.string().min(1, "Mother's contact is required."),
  motherOccupation: z.string().min(1, "Mother's occupation is required."),
});

const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(1, "Local guardian's name is required.")
    .max(20, "Local guardian's name cannot exceed 20 characters."),
  occupation: z.string().min(1, "Local guardian's occupation is required."),
  address: z.string().min(1, "Local guardian's address is required."),
  contactNo: z.string().min(1, "Local guardian's contact number is required."),
});

export const createStudentZodValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20, 'Password max 20 is required.'),
    student: z.object({
      name: userNameValidationSchema,
      profileImg: z.string().min(1, 'Profile image URL is required.'),
      dateOfBirth: z.string(),
      email: z
        .string()
        .min(1, 'Email is required.')
        .email('Invalid email format.'),
      contactNo: z.string().min(1, 'Contact number is required.'),
      emergencyContact: z
        .string()
        .min(1, 'Emergency contact number is required.'),
      gender: z.enum(['male', 'female', 'other'], {
        invalid_type_error:
          'Invalid gender value. Must be either male, female, or other.',
      }),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      permanentAddress: z.string().min(1, 'Permanent address is required.'),
      presentAddress: z.string().min(1, 'Present address is required.'),
      admissionSemester: z.string(),
    }),
  }),
});

export const studentZodValidations = {
  createStudentZodValidationSchema,
};
