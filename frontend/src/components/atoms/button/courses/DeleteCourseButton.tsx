import { memo, useCallback, FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';

import { managementCourseState } from 'store/managementCourse';
import { currentUserState } from 'store/session';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { DangerButton } from '../DangerButton';

type Props = {
  addressAndDateSpot: AddressAndDateSpotJoinData
}

const ButtonParentDiv = tw.div`my-5 m-auto text-sm`;

// デートコースの中から指定されたデートスポットを削除する。
export const DeleteCourseButton: FC<Props> = memo((props) => {
  const { addressAndDateSpot } = props;
  const getCurrentUser = useRecoilValue(currentUserState);
  const [managementCourses, setManagementCourses] = useRecoilState(managementCourseState({userId: getCurrentUser.user.id}));
  const onClickDeleteCourseAction = useCallback(() => {
    const copyCourseDuringSpots = managementCourses.dateSpots.slice();

    copyCourseDuringSpots.splice(
      managementCourses.dateSpots.indexOf(addressAndDateSpot),
      1
    );
    setManagementCourses({userId: managementCourses.userId, dateSpots: copyCourseDuringSpots});
  }, [addressAndDateSpot, managementCourses, setManagementCourses]);

  return(
    <ButtonParentDiv>
       <DangerButton dataE2e={`courseDeleteButtonId-${addressAndDateSpot.dateSpot.id}`} onClickEvent={onClickDeleteCourseAction}>コースを削除</DangerButton>
    </ButtonParentDiv>
  );
});
