import { Schema, model } from 'mongoose';
import {
  Guardian,
  UserName,
  LocalGuardian,
  Student,
} from './student.interface';
import validator from 'validator';
// Schema
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    // maxLength: [20, 'First name cannot exceed 20 characters.'],
    // // trim: true,
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //     // if (value !== firstNameStr) {
    //     //   return false;
    //     // }
    //     // return true;
    //   },
    //   message: '{VALUE} is not Capitalize,make sure it Capitalization format',
    // },
  },
  middleName: {
    type: String,
    maxLength: [20, 'Middle name cannot exceed 20 characters.'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    // maxLength: [20, 'Last name cannot exceed 20 characters.'],
    // trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not supported',
    // },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required."],
    maxLength: [20, "Father's name cannot exceed 20 characters."],
    trim: true,
  },
  fatherContact: {
    type: String,
    required: [true, "Father's contact is required."],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required."],
    maxLength: [20, "Mother's name cannot exceed 20 characters."],
    trim: true,
  },
  motherContact: {
    type: String,
    required: [true, "Mother's contact is required."],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
    trim: true,
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required."],
    maxLength: [20, "Local guardian's name cannot exceed 20 characters."],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required."],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required."],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
    trim: true,
  },
});

export const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, 'Student ID is required.'],
    unique: true,
    trim: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required.'],
  },
  profileImg: {
    type: String,
    required: [true, 'Profile image URL is required.'],
    trim: true,
  },
  dateOfBirth: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not supported',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required.'],
    trim: true,
  },
  emergencyContact: {
    type: String,
    required: [true, 'Emergency contact number is required.'],
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        '{VALUE} is not supported. Gender should be either male, female, or other.',
    },
    required: [true, 'Gender is required.'],
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
      message:
        '{VALUE} is not supported. Valid blood groups are A+, A-, AB+, AB-, B+, B-, O+, O-.',
    },
    trim: true,
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required.'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required.'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required.'],
    trim: true,
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message:
        '{VALUE} is not supported. Status should be either active or blocked.',
    },
    default: 'active',
    trim: true,
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
