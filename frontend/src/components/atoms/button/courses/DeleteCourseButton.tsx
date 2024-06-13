import { memo, useCallback, FC } from 'react';
import tw from 'tailwind-styled-components';

import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { DangerButton } from '../DangerButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { setManagementCourse } from 'reducers/currentDateCourseSlice';
import { ManagementCourseData } from 'types/managementCourses/management';

type Props = {
  addressAndDateSpot: AddressAndDateSpotJoinData
}

const ButtonParentDiv = tw.div`my-5 m-auto text-sm`;

// デートコースの中から指定されたデートスポットを削除する。
export const DeleteCourseButton: FC<Props> = memo((props) => {
  const { addressAndDateSpot } = props;
  const dispatch = useDispatch();
  const managementCourse = useSelector<RootState, ManagementCourseData>(state => state.currentDateCourse.managementCourse);

  const onClickDeleteCourseAction = useCallback(() => {
    const copyCourseDuringSpots = managementCourse.dateSpots.slice();

    copyCourseDuringSpots.splice(
      managementCourse.dateSpots.indexOf(addressAndDateSpot),
      1
    );

    dispatch(setManagementCourse({userId: managementCourse.userId, dateSpots: copyCourseDuringSpots}));
  }, [addressAndDateSpot, managementCourse, dispatch]);

  return(
    <ButtonParentDiv>
       <DangerButton dataE2e={`courseDeleteButtonId-${addressAndDateSpot.dateSpot.id}`} onClickEvent={onClickDeleteCourseAction}>コースを削除</DangerButton>
    </ButtonParentDiv>
  );
});
