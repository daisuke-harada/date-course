import { memo, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';

import { managementCourseState } from 'store/managementCourse';
import { currentUserState, loginStatusState } from 'store/session';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { BaseButton } from '../BaseButton';

type Props = {
  addressAndDateSpot: AddressAndDateSpotJoinData
}

const ButtonParentDiv = tw.div`m-5 tex-sm`;

export const AddCourseButton: FC<Props> = memo((props) => {
  const { addressAndDateSpot } = props;
  const navigate = useNavigate();
  const getCurrentUser = useRecoilValue(currentUserState);
  const getLoginStatus = useRecoilValue(loginStatusState);
  const [managementCourses, setManagementCourses] = useRecoilState(managementCourseState({userId: getCurrentUser.user.id}));
  const onClickAddCourseAction = () => {
    // 以下の2つの条件を満たしている場合のみデートコースにデートスポットを追加することができる
    // ・recoilのステートであるmanagementCourseのuserIdが0の場合。
    // ・DuringSpotsの中にaddressAndDateSpotのdateSpot.idが入っていない場合。
    if(managementCourses.userId === 0){
      setManagementCourses({userId: getCurrentUser.user.id, dateSpots: [addressAndDateSpot]});
      navigate('/managementCourses/createCourse');
    } else if(managementCourses.dateSpots.some(spot => spot.dateSpot.id === addressAndDateSpot.dateSpot.id)){
      navigate('./', {state: {message: 'このスポットはすでに選択されています', type: 'error-message', condition: true}});
    } else {
      const dateCourseIdAndNames = managementCourses.dateSpots.slice();
      dateCourseIdAndNames.push(addressAndDateSpot);
      setManagementCourses({userId: getCurrentUser.user.id, dateSpots: dateCourseIdAndNames});
      navigate('/managementCourses/createCourse');
    };
  };

  return(
    <>
      {
        getLoginStatus.status
        && getCurrentUser.user.admin === false
        &&
        (
        <ButtonParentDiv>
          <BaseButton dataE2e={`courseAddButtonId-${addressAndDateSpot.dateSpot.id}`} onClickEvent={onClickAddCourseAction}>デートコースに追加</BaseButton>
        </ButtonParentDiv>
        )
      }
    </>
  );
});
