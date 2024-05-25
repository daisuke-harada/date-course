import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { UserResponseData } from 'types/users/response';

export type CourseResponseData = {
  id: number,
  user: UserResponseData,
  travelMode: string,
  authority: string,
  dateSpots: AddressAndDateSpotJoinData[],
  noDuplicatePrefectureNames: string[]
};