import { atom} from "recoil";
import { recoilPersist } from "recoil-persist";
//import { ManagementCourse } from '../types/managementCourses/management'

const { persistAtom } = recoilPersist();

export const managementCourseState = atom(
  {
    key: "managementCourseState",
    default: {state: [{userId: 0, courseDuringSpots: []}]},
    effects_UNSTABLE: [persistAtom]
  }
);