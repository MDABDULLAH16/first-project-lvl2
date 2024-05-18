import { Request, Response } from 'express';
import { StudentService } from './student.service';
import { log } from 'console';

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
export const StudentController = {
  createStudent,
  getAllStudents,
};
