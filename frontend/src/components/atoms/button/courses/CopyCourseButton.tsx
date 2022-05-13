import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { courseInfoState, managementCourseState } from "store/managementCourse";
import { currentUserState, loginStatusState } from "store/session";
import { CourseInfoData, ManagementCourseData } from "types/managementCourses/management";
import { SecondaryButton } from "../SecondaryButton";

type Props = {
  managementCourses: ManagementCourseData,
  courseInfo: CourseInfoData
}

export const CopyCourseButton: VFC<Props> = memo((props) => {
  const { managementCourses, courseInfo } = props;
  const navigate = useNavigate();
  const getCurrentUser = useRecoilValue(currentUserState);
  const getLoginStatus = useRecoilValue(loginStatusState);
  const setGlobalManagementCourses = useSetRecoilState(managementCourseState({userId: getCurrentUser.user.id}));
  const setGlobalCourseInfo = useSetRecoilState(courseInfoState({userId: getCurrentUser.user.id}));

  const onClickAddCourseAction = () => {
      setGlobalManagementCourses({userId: getCurrentUser.user.id, courseDuringSpots: managementCourses.courseDuringSpots});
      setGlobalCourseInfo({travelMode: courseInfo.travelMode, authority: courseInfo.authority, noDuplicatePrefectureNames: courseInfo.noDuplicatePrefectureNames });
      navigate('/managementCourses/createCourse');
  };

  return(
    <>
      {
        getLoginStatus.status
        && getCurrentUser.user.admin === false
        &&
        (<SecondaryButton dataE2e="copy-course-button" onClickEvent={onClickAddCourseAction}>新しいコース作成</SecondaryButton>)
      }
    </>
  );
});