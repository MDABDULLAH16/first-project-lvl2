import { Schema, model } from 'mongoose';
import {
  Guardian,
  UserName,
  LocalGuardian,
  Student,
} from './student.interface';
// Schema

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherContact: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContact: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  address: { type: String, required: true },
  contactNo: { type: String, required: true },
});
export const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: userNameSchema,
  profileImg: { type: String, required: true },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  gender: ['male', 'female'],
  bloodGroup: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  permanentAddress: { type: String, required: true },
  presentAddress: { type: String, required: true },
  isActive: ['active', 'blocked'],
});

export const StudentModel = model<Student>('Student', studentSchema);
