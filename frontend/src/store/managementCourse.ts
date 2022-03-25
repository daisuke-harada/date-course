import { atom} from "recoil";
import { recoilPersist } from "recoil-persist";
import { ManagementCourse } from '../types/managementCourses/management'

const { persistAtom } = recoilPersist();

export const managementCourseState = atom<Array<ManagementCourse>>(
  {
    key: "managementCourseState",
    default: [],
    effects_UNSTABLE: [persistAtom]
  }
);