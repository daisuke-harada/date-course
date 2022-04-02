import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

export type ManagementCourseData = {
  userId: number,
  courseDuringSpots: Array<AddressAndDateSpotJoinData>
};

export type CourseInfoData = {
  travelMode: string,
  authority: string
};