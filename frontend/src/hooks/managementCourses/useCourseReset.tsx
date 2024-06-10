import { useResetRecoilState } from 'recoil';
import { useSelector } from 'react-redux';

import { courseInfoState, managementCourseState } from 'store/managementCourse';
import { RootState } from 'reducers';
import { User } from 'types/users/session';

export const useCourseReset = () => {
  const getCurrentUser = useSelector<RootState, User>(state => state.session.currentUser)
  const resetManagementCourses = useResetRecoilState(managementCourseState({userId: getCurrentUser.id}));
  const resetCourseInfo = useResetRecoilState(courseInfoState({userId: getCurrentUser.id}));

  return [ resetManagementCourses, resetCourseInfo ];
};