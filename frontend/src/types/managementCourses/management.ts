import { UserResponseData } from 'types/users/response';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';

export type ManagementCourseData = {
  userId: number,
  user?: UserResponseData,
  courseDuringSpots: Array<AddressAndDateSpotJoinData>
};

export type CourseInfoData = {
  travelMode: string,
  authority: string,
  noDuplicatePrefectureNames?: string[]
};