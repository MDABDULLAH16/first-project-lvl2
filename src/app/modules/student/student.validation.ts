import Joi from 'joi';

export const userNameSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .trim()
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .messages({
      'string.pattern.base': '{#label} must start with a capital letter.',
      'any.required': 'First name is required.',
      'string.max': 'First name cannot exceed 20 characters.',
    }),
  middleName: Joi.string().max(20).trim().optional(),
  lastName: Joi.string()
    .max(20)
    .trim()
    .regex(/^[A-Za-z]*$/)
    .required()
    .messages({
      'string.pattern.base': '{#label} must contain only letters.',
      'any.required': 'Last name is required.',
      'string.max': 'Last name cannot exceed 20 characters.',
    }),
});

export const guardianSchema = Joi.object({
  fatherName: Joi.string().max(20).trim().required().messages({
    'any.required': "Father's name is required.",
    'string.max': "Father's name cannot exceed 20 characters.",
  }),
  fatherContact: Joi.string().trim().required().messages({
    'any.required': "Father's contact is required.",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'any.required': "Father's occupation is required.",
  }),
  motherName: Joi.string().max(20).trim().required().messages({
    'any.required': "Mother's name is required.",
    'string.max': "Mother's name cannot exceed 20 characters.",
  }),
  motherContact: Joi.string().trim().required().messages({
    'any.required': "Mother's contact is required.",
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'any.required': "Mother's occupation is required.",
  }),
});

export const localGuardianSchema = Joi.object({
  name: Joi.string().max(20).trim().required().messages({
    'any.required': "Local guardian's name is required.",
    'string.max': "Local guardian's name cannot exceed 20 characters.",
  }),
  occupation: Joi.string().trim().required().messages({
    'any.required': "Local guardian's occupation is required.",
  }),
  address: Joi.string().trim().required().messages({
    'any.required': "Local guardian's address is required.",
  }),
  contactNo: Joi.string().trim().required().messages({
    'any.required': "Local guardian's contact number is required.",
  }),
});

export const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'any.required': 'Student ID is required.',
  }),
  name: userNameSchema.required().messages({
    'any.required': 'Name is required.',
  }),
  profileImg: Joi.string().trim().required().messages({
    'any.required': 'Profile image URL is required.',
  }),
  dateOfBirth: Joi.string().trim().optional(),
  email: Joi.string().email().trim().required().messages({
    'any.required': 'Email is required.',
    'string.email': 'Invalid email format.',
  }),
  contactNo: Joi.string().trim().required().messages({
    'any.required': 'Contact number is required.',
  }),
  emergencyContact: Joi.string().trim().required().messages({
    'any.required': 'Emergency contact number is required.',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.required': 'Gender is required.',
    'any.only': '{#label} must be either male, female, or other.',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only': '{#label} must be one of A+, A-, AB+, AB-, B+, B-, O+, O-.',
    }),
  guardian: guardianSchema.required().messages({
    'any.required': 'Guardian information is required.',
  }),
  localGuardian: localGuardianSchema.required().messages({
    'any.required': 'Local guardian information is required.',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'any.required': 'Permanent address is required.',
  }),
  presentAddress: Joi.string().trim().required().messages({
    'any.required': 'Present address is required.',
  }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#label} must be either active or blocked.',
  }),
});
