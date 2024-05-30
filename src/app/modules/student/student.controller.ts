import { Request, Response } from 'express';
import { StudentService } from './student.service';
import { studentValidationSchema } from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    //get request from any where
    const { student: studentData } = req.body;
    const { error, value } = studentValidationSchema.validate(studentData);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something is wrong',
        error: error,
      });
    }
    //get services data from createIntoDb & services
    const result = await StudentService.createStudentIntoDB(value);
    //will be response here
    res.status(200).json({
      success: true,
      message: 'Student create successfully',
      data: result,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something is wrong',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentFromDb();
    res.status(200).json({
      success: true,
      message: 'Student create successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

//get 1 item controller
const getSingleStudent = async (req: Request, res: Response) => {
  const studentId = req.params.studentId;
  const result = await StudentService.getSingleStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: 'find the student successfully',
    data: result,
  });
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
