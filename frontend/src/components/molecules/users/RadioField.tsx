import { memo, VFC } from "react";
import tw from "tailwind-styled-components";

const Label = tw.label`p-3 m-1 mx-3`;
const Input = tw.input`p-2 mt-5`;

type Props = {
  gender: string;
  onChangeRadioButton: any;
};

export const RadioField: VFC<Props>= memo((props) => {
  const {gender, onChangeRadioButton} = props;
  return(
    <div className="flex justify-start text-left w-2/3">
      <Label>男</Label>
      <Input type="radio" value='男' onChange={onChangeRadioButton} checked={gender === '男'} />
      <Label>女</Label>
      <Input type="radio" value='女' onChange={onChangeRadioButton} checked={gender === '女'} />
    </div>
  );
});