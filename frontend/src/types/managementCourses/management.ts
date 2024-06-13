import { UserResponseData } from 'types/users/response';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';

export type ManagementCourseData = {
  userId: number,
  user?: UserResponseData,
  dateSpots: AddressAndDateSpotJoinData[]
};

export type CourseInfoData = {
  travelMode: string,
  authority: string,
  noDuplicatePrefectureNames?: string[]
};

export type CurrentDateCourseState = {
  managementCourse: ManagementCourseData,
  courseInfo: CourseInfoData
}