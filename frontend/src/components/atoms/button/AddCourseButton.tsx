import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { managementCourseState } from "store/managementCourse";
import { currentUserState } from "store/session";
import tw from "tailwind-styled-components";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";
import { BaseButton } from "./BaseButton";

type Props = {
  addressAndDateSpot: AddressAndDateSpotJoinData
}

const ButtonParentDiv = tw.div`m-5`;

export const AddCourseButton: VFC<Props> = memo((props) => {
  const { addressAndDateSpot } = props;
  const navigate = useNavigate();
  const getCurrentUser = useRecoilValue(currentUserState);
  const [managementCourses, setManagementCourses] = useRecoilState(managementCourseState({userId: getCurrentUser.user.id}));
  const onClickAddCourseAction = () => {
    if(managementCourses.userId === 0){
      setManagementCourses({userId: getCurrentUser.user.id, courseDuringSpotIdAndNames: [{dateSpotId: addressAndDateSpot.dateSpot.id, dateSpotName: addressAndDateSpot.dateSpot.name}]});
    } else {
      const dateCourseIdAndNames = managementCourses.courseDuringSpotIdAndNames.slice();
      dateCourseIdAndNames.push({dateSpotId: addressAndDateSpot.dateSpot.id, dateSpotName: addressAndDateSpot.dateSpot.name});
      setManagementCourses({userId: getCurrentUser.user.id, courseDuringSpotIdAndNames: dateCourseIdAndNames});
    };
    navigate('/managementCourses/createCourse');
  };
  return(
    <ButtonParentDiv>
       <BaseButton dataE2e={`courseAddButtonId-${addressAndDateSpot.dateSpot.id}`} onClickEvent={onClickAddCourseAction}>コースに追加</BaseButton>
    </ButtonParentDiv>
  );
});