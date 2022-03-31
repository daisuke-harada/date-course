import { useRecoilValue, useResetRecoilState } from "recoil";
import { courseInfoState, managementCourseState } from "store/managementCourse";
import { currentUserState } from "store/session";

export const useCourseReset = () => {
  const getCurrentUser = useRecoilValue(currentUserState);
  const resetManagementCourses = useResetRecoilState(managementCourseState({userId: getCurrentUser.user.id}));
  const resetCourseInfo = useResetRecoilState(courseInfoState({userId: getCurrentUser.user.id}));

  return [ resetManagementCourses, resetCourseInfo ];
}