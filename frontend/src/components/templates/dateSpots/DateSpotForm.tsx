import { memo, useCallback, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';

import { PrefectureSelect } from 'components/molecules/select/dateSpots/PrefectureSelect';
import { GenreSelect } from 'components/molecules/select/dateSpots/GenreSelect';
import { BaseButton } from 'components/atoms/button/BaseButton';
import { BusinessTimeSelectArea } from 'components/molecules/select/dateSpots/BusinessTimeSelectArea';
import { ImageForm } from 'components/atoms/form/ImageForm';
import { client, formDataClient } from 'lib/api/client';
import { useNavigate } from 'react-router-dom';
import { DangerButton } from 'components/atoms/button/DangerButton';
import { prefectureDatas } from 'datas/prefectureDatas';

const MainDiv = tw.div`xl:w-1/3 lg:w-1/2 mobile(L):mt-10 mobile(M):w-5/6 mobile(M):mx-auto w-full mx-1 mt-10  mobile(L):text-base mobile(M):text-sm text-xs mobile(L):px-5 px-1 pt-2  flex flex-col items-center bg-white shadow-lg border-gray-900 rounded-3xl`;
const Title = tw.h1`sm:text-3xl text-center font-bold text-xl m-5`;
const SubDiv = tw.div`p-5 mt-2 content-center mobile(M):ml-2`;
const Input = tw.input`mb-5 border-b-2 outline-none w-full`;
const ButtonParentDiv = tw.div`text-center p-1 my-4 m-auto w-1/3`;

type Props = {
  dateSpotFormTitle: string,
  formButtonName: string,
  baseBtnDataE2e: string,
  nameDefaultValue: string,
  prefectureDefaultValue: string,
  cityNameDefaultValue: string,
  genreDefaultValue: string,
  openingTimeDefaultValue: string,
  closingTimeDefaultValue: string,
  imageDefaultValue?: File,
  dateSpotId?: number
};


export const DateSpotForm: VFC<Props> = memo((props) => {
  const {
    dateSpotFormTitle,
    formButtonName,
    baseBtnDataE2e,
    dateSpotId,
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
  const [prefectureValue, setPrefectureValue] = useState<string >(prefectureDatas.find((data) => (data.name === prefectureDefaultValue))?.id.toString() || '');
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
    image && formData.append('image', image);
    formData.append('prefectureId', prefectureValue);
    formData.append('cityName', cityName);
    return formData;
  };

  const apiDateSpotCreateAccess = (dateSpot: FormData) => {
    formDataClient.post('date_spots', dateSpot).then(response => {
      response.data.status === 'created' && navigate(`/dateSpots/${response.data.dateSpot.id}`,  {state: {message: '新規登録に成功しました', type: 'success-message', condition: true}});
      if(response.data.status === 500) {
        const { name, genreId, addressCityName, addressPrefectureId } = response.data.errorMessages;
        name !== undefined && setErrorNameMessages(name);
        genreId !== undefined && setErrorGenreIdMessages(genreId);
        addressCityName !== undefined && setErrorAddressCityName(addressCityName);
        addressPrefectureId !== undefined && setErrorAddressPrefectureId(addressPrefectureId);
      };
    });
  };

  const apiDateSpotUpdateAccess = (dateSpot: FormData, dateSpotId: number) => {
    formDataClient.put(`date_spots/${dateSpotId}`, dateSpot).then(response => {
      response.data.status === 'updated' && navigate(`/dateSpots/${response.data.dateSpot.id}`,  {state: {message: '情報を更新しました', type: 'success-message', condition: true}});
      if(response.data.status === 500) {
        const { name, genreId, addressCityName, addressPrefectureId } = response.data.errorMessages;
        name !== undefined && setErrorNameMessages(name);
        genreId !== undefined && setErrorGenreIdMessages(genreId);
        addressCityName !== undefined && setErrorAddressCityName(addressCityName);
        addressPrefectureId !== undefined && setErrorAddressPrefectureId(addressPrefectureId);
      };
    });
  };

  // デートスポット登録用、更新用
  const DateSpotRegistAndUpdateAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const dateSpot = createFormData();

    // dateSpotの新規登録の挙動
    if (formButtonName === '登録'){
      apiDateSpotCreateAccess(dateSpot);
    } else if(formButtonName === '更新' && dateSpotId){
      apiDateSpotUpdateAccess(dateSpot, dateSpotId);
    };

    e.preventDefault();
  };

  // デートスポット削除用
  const onCLickDeleteDateSpotAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if(window.confirm('本当に削除しますか？')){
      client.delete(`date_spots/${dateSpotId}`).then(response => {
        response.data.status === 'delete' && navigate('/', {state: {message: '削除しました', type: 'success-message', condition: true}} );
      });
    };
  };

  return(
    <MainDiv>
      <Title>{dateSpotFormTitle}</Title>
      {/* エラーメッセージ  */}
      <ul className='mt-5'>
        {errorNameMessages !== [] && errorNameMessages.map((message)=><li className='text-red-500'>名前は{message}</li>)}
      </ul>
      <ul>
        {errorGenreIdMessages !== [] && errorGenreIdMessages.map((message)=><li className='text-red-500'>ジャンルは{message}</li>)}
      </ul>
      <ul>
        {errorAddressPrefectureId !== [] && errorAddressPrefectureId.map((message)=><li className='text-red-500'>県名は{message}</li>)}
      </ul>
      <ul>
        {errorAddressCityName !== [] && errorAddressCityName.map((message)=><li className='text-red-500'>市町村名、番地は{message}</li>)}
      </ul>

      <SubDiv>
        <Input data-e2e='dateSpot-form-name-input' placeholder='名前を入力' value={name} onChange={onChangeName} />
        <PrefectureSelect dataE2e='dateSpot-prefecture-select' defaultValue={prefectureValue} onChangeValue={onChangePrefectureValue} />
        <Input data-e2e='dateSpot-form-cityName-input' placeholder='市町村名、番地' value={cityName} onChange={onChangeCityName} />
        <GenreSelect dataE2e='dateSpot-genre-select' defaultValue={genreValue} onChangeValue={onChangeGenreValue} />
        <BusinessTimeSelectArea
          defaultOpeningTimeValue={openingTime}
          defaultClosingTimeValue={closingTime}
          onChangeOpeningTimeValue={onChangeOpeningTime}
          onChangeClosingTimeValue={onChangeClosingTime}
          openingDataE2e='dateSpot-opningTime-select'
          closingDataE2e='dateSpot-closingTime-select'
        />
        <ImageForm selectImage={selectImage} />
        <ButtonParentDiv>
          <BaseButton dataE2e={baseBtnDataE2e} onClickEvent={DateSpotRegistAndUpdateAction}>{formButtonName}</BaseButton>
        </ButtonParentDiv>
        {
          dateSpotId
          &&
          (
            <ButtonParentDiv>
              <DangerButton onClickEvent={onCLickDeleteDateSpotAction}>削除</DangerButton>
            </ButtonParentDiv>
          )
        }
      </SubDiv>
    </MainDiv>
  );
});
