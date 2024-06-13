import { memo, FC } from "react";
import { useNavigate } from "react-router-dom";

import { CourseInfoData, ManagementCourseData } from "types/managementCourses/management";
import { SecondaryButton } from "../SecondaryButton";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { User } from 'types/users/session';
import { setCourseInfo, setManagementCourse } from "reducers/currentDateCourseSlice";

type Props = {
  managementCourse: ManagementCourseData,
  courseInfo: CourseInfoData
}

export const CopyCourseButton: FC<Props> = memo((props) => {
  const { managementCourse, courseInfo } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser)
  const loginStatus = useSelector<RootState, boolean>(state => state.session.loginStatus)

  const onClickAddCourseAction = () => {
      dispatch(setManagementCourse({userId: currentUser.id, dateSpots: managementCourse.dateSpots}))
      dispatch(setCourseInfo({travelMode: courseInfo.travelMode, authority: courseInfo.authority, noDuplicatePrefectureNames: courseInfo.noDuplicatePrefectureNames }))
      navigate('/managementCourse/createCourse');
  };

  return(
    <>
      {
        loginStatus
        && currentUser.admin === false
        &&
        (<SecondaryButton dataE2e="copy-course-button" onClickEvent={onClickAddCourseAction}>新しいコース作成</SecondaryButton>)
      }
    </>
  );
});