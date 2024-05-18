import { Request, Response } from 'express';
import { StudentService } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    //get request from any where
    const student = req.body.student;
    //get services data from createIntoDb & services
    const result = await StudentService.createStudentIntoDB(student);
    //will be response here
    res.status(200).json({
      success: true,
      message: 'Student create successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
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
