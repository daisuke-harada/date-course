import { memo, VFC } from "react";
import tw from "tailwind-styled-components";

const Label = tw.label`font-bold mobile(L):pt-3 mobile(L):mr-3 mr-2`;
const Input = tw.input`mobile(L):mr-3 mr-2 mobile(L):p-2 mobile(L):mt-5`;

type Props = {
  gender: string;
  onChangeRadioButton: React.ChangeEventHandler<HTMLInputElement>;
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