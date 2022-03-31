import { memo, useCallback, VFC } from "react";
import tw from "tailwind-styled-components";
import { BaseButton } from "components/atoms/button/BaseButton";
import { DangerButton } from "components/atoms/button/DangerButton";
import { ManagementCourse } from "types/managementCourses/management";
import { useCourseReset } from "hooks/managementCourses/useCourseReset";

type Props = {
  managementCourses: ManagementCourse,
  getCourseInfo: {
    travelMode: string;
    public: string;
  },
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

  return(
    <>
      {
        managementCourses.courseDuringSpots.length > 1
        &&
        (
          <ButtonArea>
            <ButtonParentDiv>
              <BaseButton>デートコースを登録する</BaseButton>
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