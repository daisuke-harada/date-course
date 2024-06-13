import { memo, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { BaseButton } from '../BaseButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { User } from 'types/users/session';
import { setManagementCourse } from 'reducers/currentDateCourseSlice';
import { ManagementCourseData } from 'types/managementCourses/management';

type Props = {
  addressAndDateSpot: AddressAndDateSpotJoinData
}

const ButtonParentDiv = tw.div`m-5 tex-sm`;

export const AddCourseButton: FC<Props> = memo((props) => {
  const { addressAndDateSpot } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser);
  const loginStatus = useSelector<RootState, boolean>(state => state.session.loginStatus);
  const managementCourse = useSelector<RootState, ManagementCourseData>(state => state.currentDateCourse.managementCourse)
  const onClickAddCourseAction = () => {
    // 以下の2つの条件を満たしている場合のみデートコースにデートスポットを追加することができる
    // ・DuringSpotsの中にaddressAndDateSpotのdateSpot.idが入っていない場合。
    if(managementCourse.userId === 0){
      console.log(addressAndDateSpot)
      dispatch(setManagementCourse({userId: currentUser.id, dateSpots: [addressAndDateSpot]}))
      navigate('/managementCourse/createCourse');
    } else if(managementCourse.dateSpots.some(spot => spot.dateSpot.id === addressAndDateSpot.dateSpot.id)){
      navigate('./', {state: {message: 'このスポットはすでに選択されています', type: 'error-message', condition: true}});
    } else {
      const dateCourseIdAndNames = managementCourse.dateSpots.slice();
      dateCourseIdAndNames.push(addressAndDateSpot);
      dispatch(setManagementCourse({userId: currentUser.id, dateSpots: dateCourseIdAndNames}));
      navigate('/managementCourse/createCourse');
    };
  };

  return(
    <>
      {
        loginStatus
        && currentUser.admin === false
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
