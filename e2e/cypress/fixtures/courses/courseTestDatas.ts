import { CourseResponseData } from "../../support/types/courses/response";
import { addressAndDateSpotTestDatas } from "../dateSpots/addressAndDateSpotTestDatas";
import { testUser } from "../users/response";

const firstCourses = [addressAndDateSpotTestDatas[0], addressAndDateSpotTestDatas[1], addressAndDateSpotTestDatas[2]];
const firstPrefectures = Array.from(new Set(firstCourses.map((course) => course.prefectureName)));
const secondCourses = [addressAndDateSpotTestDatas[4], addressAndDateSpotTestDatas[5], addressAndDateSpotTestDatas[3]];
const secondPrefectures = Array.from(new Set(secondCourses.map((course) => course.prefectureName)));

export const courseTestDatas: CourseResponseData[] = [
  {
    id:1,
    user: testUser,
    travelMode: 'DRIVING',
    authority: '公開',
    courseDuringSpots: firstCourses,
    noDuplicatePrefectureNames: firstPrefectures
  },
  {
    id:2,
    user: testUser,
    travelMode: 'DRIVING',
    authority: '公開',
    courseDuringSpots: secondCourses,
    noDuplicatePrefectureNames: secondPrefectures
  }
]