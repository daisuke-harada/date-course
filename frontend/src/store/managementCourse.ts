import { CourseInfo } from './../types/managementCourses/management';
import { atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ManagementCourse } from '../types/managementCourses/management'

const { persistAtom } = recoilPersist();

export const managementCourseState = atomFamily<ManagementCourse, { userId: number }>(
  {
    key: "managementCourseState",
    default: {userId: 0, courseDuringSpots: []},
    effects_UNSTABLE: [persistAtom]
  }
);

export const courseInfoState = atomFamily<CourseInfo, { userId: number }>(
  {
    key: "courseInfoState",
    default: {travelMode: 'DRIVING', authority: '公開'},
    effects_UNSTABLE: [persistAtom]
  }
);