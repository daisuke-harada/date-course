import { memo, FC } from 'react';
import tw from 'tailwind-styled-components';

type Props = {
  gender: string;
  onChangeRadioButton: React.ChangeEventHandler<HTMLInputElement>;
};

const Label = tw.label`font-bold mobile(L):pt-3 mobile(L):mr-3 mr-2`;
const Input = tw.input`mobile(L):mr-3 mr-2 mobile(L):p-2 mobile(L):mt-5`;

export const RadioArea: FC<Props>= memo((props) => {
  const {gender, onChangeRadioButton} = props;
  return(
    <div className='flex justify-start text-left w-2/3 mobile(M):ml-0 ml-8'>
      <Label>男性</Label>
      <Input type='radio' value='男性' onChange={onChangeRadioButton} checked={gender === '男性'} />
      <Label>女性</Label>
      <Input type='radio' value='女性' onChange={onChangeRadioButton} checked={gender === '女性'} />
    </div>
  );
});