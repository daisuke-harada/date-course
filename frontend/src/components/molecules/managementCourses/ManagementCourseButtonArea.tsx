import { memo, useCallback, VFC } from "react";
import tw from "tailwind-styled-components";
import { BaseButton } from "components/atoms/button/BaseButton";
import { DangerButton } from "components/atoms/button/DangerButton";
import { CourseInfo, ManagementCourse } from "types/managementCourses/management";
import { useCourseReset } from "hooks/managementCourses/useCourseReset";
import { client } from "lib/api/client";

type Props = {
  managementCourses: ManagementCourse,
  getCourseInfo: CourseInfo,
}

const ButtonArea = tw.div`flex flex-col items-center mx-5 my-10`;
const ButtonParentDiv = tw.div`text-center m-5 text-4xl w-1/2`

export const ManagementCourseButtonArea: VFC<Props> = memo((props) => {
  const { managementCourses, getCourseInfo } = props;

  const [ resetManagementCourses, resetCourseInfo ] = useCourseReset();

  const onClickAllDelete = useCallback(() => {
    resetManagementCourses();
    resetCourseInfo();
  }, [ resetManagementCourses, resetCourseInfo ]);

  const onClickCreateCourse = useCallback(() => {
    const courseDuringSpotIds = managementCourses.courseDuringSpots.map((duringSpot) => duringSpot.id);
    const course = {
      userId: managementCourses.userId,
      duringSpots: courseDuringSpotIds,
      travelMode: getCourseInfo.travelMode,
      authority: getCourseInfo.authority
    }

    client.post('courses', course).then(response => {
      response.data.status === 'created' && resetManagementCourses();
      response.data.status === 'created' && resetCourseInfo();
    });
  }, [ managementCourses, getCourseInfo, resetCourseInfo, resetManagementCourses ]);

  return(
    <>
      {
        managementCourses.courseDuringSpots.length > 1
        &&
        (
          <ButtonArea>
            <ButtonParentDiv>
              <BaseButton onClickEvent={onClickCreateCourse}>デートコースを登録する</BaseButton>
            </ButtonParentDiv>
            <ButtonParentDiv>
              <DangerButton onClickEvent={onClickAllDelete}>全て削除</DangerButton>
            </ButtonParentDiv>
          </ButtonArea>
        )
      }
    </>
  );
});