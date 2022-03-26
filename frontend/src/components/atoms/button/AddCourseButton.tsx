import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { managementCourseState } from "store/managementCourse";
import { currentUserState } from "store/session";
import tw from "tailwind-styled-components";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";
import { BaseButton } from "./BaseButton";

type Props = {
  dateSpot: AddressAndDateSpotJoinData
}

const ButtonParentDiv = tw.div`m-5`;

export const AddCourseButton: VFC<Props> = memo((props) => {
  const { dateSpot } = props;
  const navigate = useNavigate();
  const getCurrentUser = useRecoilValue(currentUserState);
  const [managementCourses, setManagementCourses] = useRecoilState(managementCourseState({userId: getCurrentUser.user.id}));
  const onClickAddCourseAction = () => {
    if(managementCourses.userId === 0){
      setManagementCourses({userId: getCurrentUser.user.id, courseDuringSpots: [dateSpot]});
    } else {
      const dateCourses = managementCourses.courseDuringSpots.slice();
      dateCourses.push(dateSpot);
      setManagementCourses({userId: getCurrentUser.user.id, courseDuringSpots: dateCourses});
    };
    navigate('/managementCourses/createCourse');
  };
  return(
    <ButtonParentDiv>
       <BaseButton dataE2e={`courseAddButtonId-${dateSpot.id}`} onClickEvent={onClickAddCourseAction}>コースに追加</BaseButton>
    </ButtonParentDiv>
  );
});