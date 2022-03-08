import { memo, useEffect, useState, VFC } from "react";
import { BaseButton } from "components/atoms/button/BaseButton";
import tw from "tailwind-styled-components";
import { client } from "lib/api/client";
import { Area } from "types/dataSpots/activeHash";

const MainDiv = tw.div`max-w-xl mx-auto mt-10 bg-white p-5 border-gray-900`;
const Title = tw.h1`text-center text-lg m-5`;
const Form = tw.form`p-5 mt-2 flex flex-col content-center mobile(M):ml-2`;
const Input = tw.input`mb-5 border-b-2 outline-none w-full`;

type Props = {
  dateSpotFormTitle: string,
  formButtonName: string,
  nameDefaultValue: string,
  cityNameDefaultValue: string,
};


export const DateSpotForm: VFC<Props> = memo((props) => {
  const {dateSpotFormTitle, formButtonName, nameDefaultValue, cityNameDefaultValue} = props;
  const [name, setName] = useState<string>(nameDefaultValue);
  const [cityName, setCityName] = useState<string>(cityNameDefaultValue);
  const [areas, setAreas] = useState([]);

  const onChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => setName(e.target.value);
  const onChangeCityName: React.ChangeEventHandler<HTMLInputElement> = (e) => setCityName(e.target.value);

  useEffect(() => {
    client.get('date_spots/new').then(response => {
      setAreas(response.data.areas);
      console.log(response.data);
    });
  }, [setAreas]);

  return(
    <MainDiv>
      <Title>{dateSpotFormTitle}</Title>
      {/* エラーメッセージ  */}
      <Form>
        <Input data-e2e="dateSpot-form-name-input" placeholder="名前を入力" value={name} onChange={onChangeName} />
        {/* 住所選択 */}
        {/* <select>
        </select> */}
        <Input data-e2e="dateSpot-form-cityName-input" placeholder="市町村名、番地" value={cityName} onChange={onChangeCityName} />
        {/* ジャンル選択 */}
        {/* 営業時間選択 */}
        {/* サムネイル選択 */}
        <BaseButton>{formButtonName}</BaseButton>
      </Form>
    </MainDiv>
  );
})