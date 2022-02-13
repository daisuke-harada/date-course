import { memo, VFC } from "react";
import tw from "tailwind-styled-components";

const Label = tw.label`p-3 m-1 mx-3`;
const Input = tw.input`p-2 mt-5`;

type Props = {
  gender: boolean;
};

export const RadioField: VFC<Props>= memo((props) => {
  const {gender} = props;
  console.log(gender);
  return(
    <>
      <div className="flex justify-start text-left w-2/3">
        <Label>男</Label>
        <Input type="radio" id="man" name="gender" checked/>
        <Label>女</Label>
        <Input type="radio" id="woman" name="gender" />
      </div>
    </>
  );
});