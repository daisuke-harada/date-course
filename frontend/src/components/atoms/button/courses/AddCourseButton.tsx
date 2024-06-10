import { memo, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';

import { managementCourseState } from 'store/managementCourse';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { BaseButton } from '../BaseButton';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { User } from 'types/users/session';

type Props = {
  addressAndDateSpot: AddressAndDateSpotJoinData
}

const ButtonParentDiv = tw.div`m-5 tex-sm`;

export const AddCourseButton: FC<Props> = memo((props) => {
  const { addressAndDateSpot } = props;
  const navigate = useNavigate();
  const getCurrentUser = useSelector<RootState, User>(state => state.session.currentUser);
  const getLoginStatus = useSelector<RootState, boolean>(state => state.session.loginStatus);
  const [managementCourses, setManagementCourses] = useRecoilState(managementCourseState({userId: getCurrentUser.id}));
  const onClickAddCourseAction = () => {
    // 以下の2つの条件を満たしている場合のみデートコースにデートスポットを追加することができる
    // ・DuringSpotsの中にaddressAndDateSpotのdateSpot.idが入っていない場合。
    if(managementCourses.userId === 0){
      setManagementCourses({userId: getCurrentUser.id, dateSpots: [addressAndDateSpot]});
      navigate('/managementCourses/createCourse');
    } else if(managementCourses.dateSpots.some(spot => spot.dateSpot.id === addressAndDateSpot.dateSpot.id)){
      navigate('./', {state: {message: 'このスポットはすでに選択されています', type: 'error-message', condition: true}});
    } else {
      const dateCourseIdAndNames = managementCourses.dateSpots.slice();
      dateCourseIdAndNames.push(addressAndDateSpot);
      setManagementCourses({userId: getCurrentUser.id, dateSpots: dateCourseIdAndNames});
      navigate('/managementCourses/createCourse');
    };
  };

  return(
    <>
      {
        getLoginStatus
        && getCurrentUser.admin === false
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
