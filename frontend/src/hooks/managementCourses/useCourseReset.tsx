import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'reducers';
import { User } from 'types/users/session';
import { setCourseInfo, setManagementCourse } from 'reducers/currentDateCourseSlice';
import { initialCourseInfo } from 'defaults/dateCourseDefaults';

export const useCourseReset = () => {

  const dispatch = useDispatch();
  const getCurrentUser = useSelector<RootState, User>(state => state.session.currentUser)

  const resetManagementCourses = () => {
    dispatch(setManagementCourse({userId: getCurrentUser.id, user: getCurrentUser, dateSpots: []}))
  }

  const resetCourseInfo = () => {
    dispatch(setCourseInfo(initialCourseInfo))
  }

  return [ resetManagementCourses, resetCourseInfo ];
};