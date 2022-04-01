import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

export type ManagementCourse = {
  userId: number,
  courseDuringSpots: Array<AddressAndDateSpotJoinData>
};

export type CourseInfo = {
  travelMode: string,
  authority: string
};