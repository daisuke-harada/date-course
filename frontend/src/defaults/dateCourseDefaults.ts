import { ManagementCourseData, CourseInfoData, CurrentDateCourseState} from "types/managementCourses/management";
import { initialUser } from "defaults/userDefaults";
import { initialAddressAndDateSpotJoin } from "defaults/dateSpotDefaults";

export const initialManagementCourse: ManagementCourseData = {
  userId: 0,
  user: initialUser,
  dateSpots: [initialAddressAndDateSpotJoin],
};

export const initialCourseInfo: CourseInfoData = {
  travelMode: 'DRIVEING',
  authority: '非公開',
  noDuplicatePrefectureNames: [],
};

export const initialCurrentDateCourseState: CurrentDateCourseState = {
  managementCourse: initialManagementCourse,
  courseInfo: initialCourseInfo
}