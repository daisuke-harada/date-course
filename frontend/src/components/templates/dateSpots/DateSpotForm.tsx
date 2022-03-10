import { memo, useCallback, useState, VFC } from "react";
import tw from "tailwind-styled-components";

import { PrefectureSelect } from "components/molecules/dateSpots/PrefectureSelect";
import { GenreSelect } from "components/molecules/dateSpots/GenreSelect";
import { BaseButton } from "components/atoms/button/BaseButton";
import { BusinessTimeSelectArea } from "components/molecules/dateSpots/BusinessTimeSelectArea";
import { ImageForm } from "components/atoms/form/ImageForm";
import { formDataClient } from "lib/api/client";
import { useNavigate } from "react-router-dom";

const MainDiv = tw.div`mobile(L):mt-10 mobile(L):px-5 mobile(L):text-base mobile(L):mx-auto mobile(M):text-sm text-xs pt-5 px-2 m-10 flex flex-col items-center max-w-md bg-white shadow-lg border-gray-900 rounded-2xl`;
const Title = tw.h1`text-center text-lg m-5`;
const Form = tw.form`p-5 mt-2 flex flex-col content-center mobile(M):ml-2`;
const Input = tw.input`mb-5 border-b-2 outline-none w-full`;
const ButtonParentDiv = tw.div`text-center p-1 mx-6 my-4`;

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

  const navigate = useNavigate();

  // エラーメッセージ用のステート
  const [errorNameMessages, setErrorNameMessages] = useState([]);
  const [errorGenreIdMessages, setErrorGenreIdMessages] = useState([]);
  const [errorAddressCityName, setErrorAddressCityName] = useState([]);
  const [errorAddressPrefectureId, setErrorAddressPrefectureId] = useState([]);

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
      response.data.status === 'created' && navigate(`/dateSpots/${response.data.dateSpot.id}`,  {state: {message: '新規登録に成功しました。', type: 'success-message', condition: true}});
      if(response.data.status === 500) {
        const { name, genreId, addressCityName, addressPrefectureId } = response.data.errorMessages;
        name !== undefined && setErrorNameMessages(name);
        genreId !== undefined && setErrorGenreIdMessages(genreId);
        addressCityName !== undefined && setErrorAddressCityName(addressCityName);
        addressPrefectureId !== undefined && setErrorAddressPrefectureId(addressPrefectureId);
      };
    });
    e.preventDefault();
  };

  return(
    <MainDiv>
      <Title>{dateSpotFormTitle}</Title>
      {/* エラーメッセージ  */}
      <ul className="mt-5">
        {errorNameMessages !== [] && errorNameMessages.map((message)=><li className="text-red-500">名前は{message}</li>)}
      </ul>
      <ul>
        {errorGenreIdMessages !== [] && errorGenreIdMessages.map((message)=><li className="text-red-500">ジャンルは{message}</li>)}
      </ul>
      <ul>
        {errorAddressPrefectureId !== [] && errorAddressPrefectureId.map((message)=><li className="text-red-500">県名は{message}</li>)}
      </ul>
      <ul>
        {errorAddressCityName !== [] && errorAddressCityName.map((message)=><li className="text-red-500">市町村名、番地は{message}</li>)}
      </ul>

      <Form onSubmit={DateSpotRegistAction}>
        <Input data-e2e="dateSpot-form-name-input" placeholder="名前を入力" value={name} onChange={onChangeName} />
        <PrefectureSelect dataE2e="dateSpot-prefecture-select" defaultValue={prefectureValue} onChangeValue={onChangePrefectureValue} />
        <Input data-e2e="dateSpot-form-cityName-input" placeholder="市町村名、番地" value={cityName} onChange={onChangeCityName} />
        <GenreSelect dataE2e="dateSpot-genre-select" defaultValue={genreValue} onChangeValue={onChangeGenreValue} />
        <BusinessTimeSelectArea
          defaultOpeningTimeValue={openingTime}
          defaultClosingTimeValue={closingTime}
          onChangeOpeningTimeValue={onChangeOpeningTime}
          onChangeClosingTimeValue={onChangeClosingTime}
          openingDataE2e="dateSpot-opningTime-select"
          closingDataE2e="dateSpot-closingTime-select"
        />
        <ImageForm selectImage={selectImage} />
        <ButtonParentDiv>
          <BaseButton dataE2e="dateSpot-regist-button">{formButtonName}</BaseButton>
        </ButtonParentDiv>
      </Form>
    </MainDiv>
  );
});
