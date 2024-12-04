import { memo, useCallback, FC } from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { DangerButton } from 'components/atoms/button/DangerButton';
import { CourseInfoData, ManagementCourseData } from 'types/managementCourses/management';
import { useCourseReset } from 'hooks/managementCourses/useCourseReset';
import { client } from 'lib/api/client';

type Props = {
  managementCourse: ManagementCourseData,
  getCourseInfo: CourseInfoData,
}

const ButtonArea = tw.div`flex flex-col items-center mx-auto my-10`;
const ButtonParentDiv = tw.div`mobile(L):text-xl sm:text-2xl lg:text-4xl text-center m-5 w-1/2`;

export const ManagementCourseButtonArea: FC<Props> = memo((props) => {
  const { managementCourse, getCourseInfo } = props;

  const navigate = useNavigate();

  const [ resetmanagementCourse, resetCourseInfo ] = useCourseReset();

  const onClickAllDelete = useCallback(() => {
    resetmanagementCourse();
    resetCourseInfo();
  }, [ resetmanagementCourse, resetCourseInfo ]);

  const onClickCreateCourse = useCallback(() => {
    const courseDateSpotIds = managementCourse.dateSpots.map((dateSpot) => dateSpot.id);
    const course = {
      userId: managementCourse.userId,
      dateSpots: courseDateSpotIds,
      travelMode: getCourseInfo.travelMode,
      authority: getCourseInfo.authority
    }

    client.post('courses', {course}).then(response => {
      response.status === 201 && navigate(`/courses/${response.data.courseId}`);
      response.status === 201 && resetmanagementCourse();
      response.status === 201 && resetCourseInfo();
    }).catch(error => {
      navigate(`./`, {state: {message: error.response.data.error_messages, type: 'error-message', condition: true}});
    });
  }, [ managementCourse, getCourseInfo, resetCourseInfo, resetmanagementCourse, navigate ]);

  return(
    <>
      {
        managementCourse.dateSpots && managementCourse.dateSpots.length > 1
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