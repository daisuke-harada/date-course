import { memo, useCallback, useState, VFC } from "react";
import tw from "tailwind-styled-components";

import { PrefectureSelect } from "components/molecules/dateSpots/PrefectureSelect";
import { GenreSelect } from "components/molecules/dateSpots/GenreSelect";
import { BaseButton } from "components/atoms/button/BaseButton";
import { BusinessTimeSelectArea } from "components/molecules/dateSpots/BusinessTimeSelectArea";
import { ImageForm } from "components/atoms/form/ImageForm";
import { formDataClient } from "lib/api/client";

const MainDiv = tw.div`mobile(L):mt-10 mobile(L):px-5 mobile(L):text-base mobile(L):mx-auto mobile(M):text-sm text-xs pt-5 px-2 m-10 flex flex-col items-center max-w-md bg-white shadow-lg border-gray-900 rounded-2xl`;
const Title = tw.h1`text-center text-lg m-5`;
const Form = tw.form`p-5 mt-2 flex flex-col content-center mobile(M):ml-2`;
const Input = tw.input`mb-5 border-b-2 outline-none w-full`;

type Props = {
  dateSpotFormTitle: string,
  formButtonName: string,
  nameDefaultValue: string,
  prefectureDefaultValue: string,
  cityNameDefaultValue: string,
  genreDefaultValue: string,
  openingTimeDefaultValue: string,
  closingTimeDefaultValue: string,
  imageDefaultValue?: File,
};


export const DateSpotForm: VFC<Props> = memo((props) => {
  const {
    dateSpotFormTitle,
    formButtonName,
    nameDefaultValue,
    prefectureDefaultValue,
    cityNameDefaultValue,
    genreDefaultValue,
    openingTimeDefaultValue,
    closingTimeDefaultValue,
    imageDefaultValue,
  } = props;

  const [name, setName] = useState<string>(nameDefaultValue);
  const [prefectureValue, setPrefectureValue] = useState<string>(prefectureDefaultValue);
  const [cityName, setCityName] = useState<string>(cityNameDefaultValue);
  const [genreValue, setGenreValue] = useState<string>(genreDefaultValue);
  const [openingTime, setOpeningTime] = useState<string>(openingTimeDefaultValue);
  const [closingTime, setClosingTime] = useState<string>(closingTimeDefaultValue);
  const [image, setImage] = useState<File | undefined>(imageDefaultValue);

  const onChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => setName(e.target.value);
  const onChangePrefectureValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setPrefectureValue(e.target.value), []);
  const onChangeCityName: React.ChangeEventHandler<HTMLInputElement> = (e) => setCityName(e.target.value);
  const onChangeGenreValue: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setGenreValue(e.target.value), []);
  const onChangeOpeningTime: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setOpeningTime(e.target.value), []);
  const onChangeClosingTime: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => setClosingTime(e.target.value), []);

  const selectImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.currentTarget.files !== null){
      setImage(e.currentTarget.files[0]);
    }else{
      setImage(undefined);
    };
  }, []);

  const createFormData = (): FormData => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('genreId', genreValue);
    formData.append('openingTime', openingTime);
    formData.append('closingTime', closingTime);
    image && formData.append("image", image);
    formData.append('prefectureId', prefectureValue);
    formData.append('cityName', cityName);
    return formData;
  };

  const DateSpotRegistAction = (e: React.FormEvent<HTMLFormElement>) => {
    const dateSpot = createFormData();
    formDataClient.post('date_spots', dateSpot).then(response => {
      console.log(response.data.dateSpot.id);
    });
  };

  return(
    <MainDiv>
      <Title>{dateSpotFormTitle}</Title>
      {/* エラーメッセージ  */}
      <Form onSubmit={DateSpotRegistAction}>
        <Input data-e2e="dateSpot-form-name-input" placeholder="名前を入力" value={name} onChange={onChangeName} />
        <PrefectureSelect defaultValue={prefectureValue} onChangeValue={onChangePrefectureValue} />
        <Input data-e2e="dateSpot-form-cityName-input" placeholder="市町村名、番地" value={cityName} onChange={onChangeCityName} />
        <GenreSelect defaultValue={genreValue} onChangeValue={onChangeGenreValue} />
        <BusinessTimeSelectArea
          defaultOpeningTimeValue={openingTime}
          defaultClosingTimeValue={closingTime}
          onChangeOpeningTimeValue={onChangeOpeningTime}
          onChangeClosingTimeValue={onChangeClosingTime}
        />
        <ImageForm selectImage={selectImage} />
        <BaseButton>{formButtonName}</BaseButton>
      </Form>
    </MainDiv>
  );
});
