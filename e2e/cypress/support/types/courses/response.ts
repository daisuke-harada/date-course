import { AddressAndDateSpotJoinData } from '../dateSpots/response';
import { UserResponseData } from '../users/response';

export type CourseResponseData = {
  id: number,
  user: UserResponseData,
  travelMode: string,
  authority: string,
  courseDuringSpots: AddressAndDateSpotJoinData[],
  noDuplicatePrefectureNames: string[]
};