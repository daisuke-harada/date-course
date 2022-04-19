import { UserResponseData } from '../users/response';
import { AddressAndDateSpotJoinData } from '../dateSpots/response';

export type ManagementCourseData = {
  userId: number,
  user?: UserResponseData,
  courseDuringSpots: Array<AddressAndDateSpotJoinData>
};

export type CourseInfoData = {
  travelMode: string,
  authority: string
};