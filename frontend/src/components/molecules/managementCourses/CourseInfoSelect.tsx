import { memo, VFC } from "react";
import { SetterOrUpdater } from "recoil";
import tw from "tailwind-styled-components";

type Props = {
  setCourseInfo: SetterOrUpdater<{
    travelMode: string;
    authority: string;
  }>,
  dataE2e?: string,
  getCourseInfo: {
    travelMode: string;
    authority: string;
  }
};

const Label = tw.label`font-bold m-2`;
const Input = tw.input`mt-4 mx-2`;
const MainDiv= tw.div`m-5 font-bold flex`;

export const CourseInfoSelect: VFC<Props> = memo((props) => {
  const { setCourseInfo, dataE2e, getCourseInfo } = props;

  const onChangeTravelMode: React.ChangeEventHandler<HTMLSelectElement> = (e) => setCourseInfo({travelMode: e.target.value, authority: getCourseInfo.authority});
  const onChangeRadioButton: React.ChangeEventHandler<HTMLInputElement> = (e) => setCourseInfo({travelMode: getCourseInfo.travelMode, authority: e.target.value});

  return(
    <>
    <MainDiv>
      <div className="m-2">
        交通手段を選択
      </div>
      <select data-e2e={dataE2e} className="mx-2 border-2 border-gray-400 rounded-md" defaultValue={getCourseInfo.travelMode} onChange={onChangeTravelMode}>
        <option value="DRIVING">車</option>
        <option value="WALKING">歩く</option>
        <option value="BICYCLING">自転車</option>
      </select>
    </MainDiv>
    <MainDiv>
      <Label>公開</Label>
      <Input type="radio" value='公開' onChange={onChangeRadioButton} checked={getCourseInfo.authority === '公開'} />
      <Label>非公開</Label>
      <Input type="radio" value='非公開' onChange={onChangeRadioButton} checked={getCourseInfo.authority === '非公開'} />
    </MainDiv>
    </>
  );
});