import { CourseInfoData, ManagementCourseData } from 'types/managementCourses/management';
import { atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const managementCourseState = atomFamily<ManagementCourseData, { userId: number }>(
  {
    key: 'managementCourseState',
    default: {userId: 0, courseDuringSpots: []},
    effects_UNSTABLE: [persistAtom]
  }
);

export const courseInfoState = atomFamily<CourseInfoData, { userId: number }>(
  {
    key: 'courseInfoState',
    default: {travelMode: 'DRIVING', authority: '公開'},
    effects_UNSTABLE: [persistAtom]
  }
);