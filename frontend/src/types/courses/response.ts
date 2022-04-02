import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { UserResponseData } from 'types/users/response';

export type CourseResponseData = {
  user: UserResponseData,
  travelMode: string,
  authority: string,
  duringSpots: AddressAndDateSpotJoinData[]
};