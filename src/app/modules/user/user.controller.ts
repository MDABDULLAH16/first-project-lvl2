import { Request, Response } from 'express';
import { userServices } from './user.service';
import { userValidation } from './user.validation';

const createStudent = async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;
  try {
    //get request from any where

    //validation with JOI
    // const { error, value } = studentValidationSchema.validate(studentData);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something is wrong',
    //     error: error,
    //   });
    // }

    // //validation with Zod
    // const ZodValidation =
    //   userValidation.userValidationSchema.parse(studentData);

    //get services data from createIntoDb & services
    const result = await userServices.createStudentIntoDB(
      password,
      studentData,
    );
    //will be response here
    res.status(200).json({
      success: true,
      message: 'Student create successfully',
      data: result,
    });
  } catch (error: any) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Something is wrong',
      error: error,
    });
  }
};

export const userController = {
  createStudent,
};
