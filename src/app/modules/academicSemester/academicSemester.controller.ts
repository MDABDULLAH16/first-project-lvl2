// import { userServices } from './user.service';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  //   const { password, student: studentData } = req.body;
  //get services data from createIntoDb & services
  const result = await academicSemesterService.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Academic Semester successfully',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
};
