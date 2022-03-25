import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";
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
  const onClickAddCourseAction = () => {
    navigate('/managementCourses/createCourse');
  };
  return(
    <ButtonParentDiv>
       <BaseButton dataE2e={`courseAddButtonId-${dateSpot.id}`} onClickEvent={onClickAddCourseAction}>コースに追加</BaseButton>
    </ButtonParentDiv>
  );
});