import { NextFunction, Request, Response } from 'express';
import { StudentService } from './student.service';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all Student successfully',
    data: result,
  });
});

//get 1 item controller
const getSingleStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentService.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single Student successfully',
    data: result,
  });
});

//delete item with updatedOne
const deletedStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentService.deletedStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Student successfully',
    data: result,
  });
});

export const StudentController = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deletedStudent,
};
