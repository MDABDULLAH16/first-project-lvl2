export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type TAcademicSemesterCode = '01' | '02' | '03';
export type TAcademicSemesterName = 'Autumn' | 'Summer' | 'Fall';

export type TAcademicSemester = {
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

//semester name ---> code
export type TAcademicSemesterMapper = {
  [key: string]: string;
};
