import { memo, useCallback, VFC } from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { DangerButton } from 'components/atoms/button/DangerButton';
import { CourseInfoData, ManagementCourseData } from 'types/managementCourses/management';
import { useCourseReset } from 'hooks/managementCourses/useCourseReset';
import { client } from 'lib/api/client';

type Props = {
  managementCourses: ManagementCourseData,
  getCourseInfo: CourseInfoData,
}

const ButtonArea = tw.div`flex flex-col items-center mx-auto my-10`;
const ButtonParentDiv = tw.div`mobile(L):text-xl sm:text-2xl lg:text-4xl text-center m-5 w-1/2`;

export const ManagementCourseButtonArea: VFC<Props> = memo((props) => {
  const { managementCourses, getCourseInfo } = props;

  const navigate = useNavigate();

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
      response.data.status === 'created' && navigate(`/courses/${response.data.courseId}`);
      response.data.status === 'created' && resetManagementCourses();
      response.data.status === 'created' && resetCourseInfo();
    });
  }, [ managementCourses, getCourseInfo, resetCourseInfo, resetManagementCourses, navigate ]);

  return(
    <>
      {
        managementCourses.courseDuringSpots && managementCourses.courseDuringSpots.length > 1
        &&
        (
          <ButtonArea>
            <ButtonParentDiv>
              <BaseButton onClickEvent={onClickCreateCourse}>登録</BaseButton>
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