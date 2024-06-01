import { NextFunction, Request, Response } from 'express';
import { StudentService } from './student.service';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';

// import { studentValidationSchema } from './student.Joi.Validation';
// import studentZodValidationSchema from './student.validation';

// const createStudent = async (req: Request, res: Response) => {
//   const { student: studentData } = req.body;
//   try {
//     //get request from any where

//     //validation with JOI
//     // const { error, value } = studentValidationSchema.validate(studentData);
//     // if (error) {
//     //   res.status(500).json({
//     //     success: false,
//     //     message: 'Something is wrong',
//     //     error: error,
//     //   });
//     // }

//     //validation with Zod
//     const ZodValidation = studentZodValidationSchema.parse(studentData);

//     //get services data from createIntoDb & services
//     const result = await StudentService.createStudentIntoDB(ZodValidation);
//     //will be response here
//     res.status(200).json({
//       success: true,
//       message: 'Student create successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     // console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Something is wrong',
//       error: error,
//     });
//   }
// };

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentService.getAllStudentFromDb();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get all Student successfully',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message || 'Something is wrong',
    //   error: error,
    // });
    next(error);
  }
};

//get 1 item controller
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const studentId = req.params.studentId;
  try {
    const result = await StudentService.getSingleStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get single Student successfully',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message || 'Something is wrong',
    //   error: error,
    // });
    next(error);
  }
};

//delete item with updatedOne
const deletedStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const studentId = req.params.studentId;
  try {
    const result = await StudentService.deletedStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Student successfully',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message || 'Something is wrong',
    //   error: error,
    // });
    next(error);
  }
};

export const StudentController = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deletedStudent,
};
