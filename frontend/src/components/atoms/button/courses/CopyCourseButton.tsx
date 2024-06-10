import { memo, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { courseInfoState, managementCourseState } from "store/managementCourse";
import { CourseInfoData, ManagementCourseData } from "types/managementCourses/management";
import { SecondaryButton } from "../SecondaryButton";
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { User } from 'types/users/session';

type Props = {
  managementCourses: ManagementCourseData,
  courseInfo: CourseInfoData
}

export const CopyCourseButton: FC<Props> = memo((props) => {
  const { managementCourses, courseInfo } = props;
  const navigate = useNavigate();
  const getCurrentUser = useSelector<RootState, User>(state => state.session.currentUser)
  const getLoginStatus = useSelector<RootState, boolean>(state => state.session.loginStatus)
  const setGlobalManagementCourses = useSetRecoilState(managementCourseState({userId: getCurrentUser.id}));
  const setGlobalCourseInfo = useSetRecoilState(courseInfoState({userId: getCurrentUser.id}));

  const onClickAddCourseAction = () => {
      setGlobalManagementCourses({userId: getCurrentUser.id, dateSpots: managementCourses.dateSpots});
      setGlobalCourseInfo({travelMode: courseInfo.travelMode, authority: courseInfo.authority, noDuplicatePrefectureNames: courseInfo.noDuplicatePrefectureNames });
      navigate('/managementCourses/createCourse');
  };

  return(
    <>
      {
        getLoginStatus
        && getCurrentUser.admin === false
        &&
        (<SecondaryButton dataE2e="copy-course-button" onClickEvent={onClickAddCourseAction}>新しいコース作成</SecondaryButton>)
      }
    </>
  );
});