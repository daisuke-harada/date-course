import { memo, VFC } from "react";
import tw from "tailwind-styled-components";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";
import { BaseButton } from "./BaseButton";

type Props = {
  dateSpot: AddressAndDateSpotJoinData
}

const ButtonParentDiv = tw.div`m-5`;

export const AddCourseButton: VFC<Props> = memo((props) => {
  const {dateSpot} = props;
  console.log(dateSpot);
  return(
    <ButtonParentDiv>
       <BaseButton>コースに追加</BaseButton>
    </ButtonParentDiv>
  );
});