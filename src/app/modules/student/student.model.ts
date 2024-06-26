import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TUserName,
  TLocalGuardian,
  TStudent,
  StudentModel,
  // StudentMethods,
} from './student.interface';
import validator from 'validator';

// Schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
  },
  middleName: {
    type: String,
    maxLength: [20, 'Middle name cannot exceed 20 characters.'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
  },
});

const guardianSchema = new Schema<TGuardian>({
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

const localGuardianSchema = new Schema<TLocalGuardian>({
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

// if you use custom instance method ,you should use StudentMethods
export const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required.'],
      unique: true,
      trim: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required.'],
      unique: true,
      ref: 'User',
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
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//query middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//pre findOne does not break aggregate, so we should break it manually
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//this is for statics methods
studentSchema.statics.isUserExists = async function (id: string) {
  const isExistUser = await Student.findOne({ id });
  return isExistUser;
};

//existing user
// studentSchema.methods.isUserExists = async function (id: string) {
//   const isExistUser = await Student.findOne({ id });
//   return isExistUser;
// };
//this is default data model , hare, StudentModel for checking user existing its import from interface
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
