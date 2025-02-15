import { memo, useCallback, useState, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { formDataClient } from 'lib/api/client';
import { BaseButton } from 'components/atoms/button/BaseButton';
import { RadioArea } from 'components/organisms/area/RadioArea';
import { DeactivateAcountButton } from 'components/atoms/button/users/DeactivateAcountButton';
import { ImageForm } from 'components/atoms/form/ImageForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { User } from 'types/users/session';
import { setCurrentUser } from 'reducers/loginSlice';

type Props = {
  nameDefaultValue: string,
  emailDefaultValue: string,
  genderDefaultValue: string,
  imageDefaultValue?: string | null | undefined,
  userFormTitle: string,
  buttonName: string,
  afterLoginSuccess?: (data: User) => void,
};

const MainDiv = tw.div`user-form`;
const Title = tw.h1`text-center font-bold`;
const Input = tw.input`my-5 border-b-2 outline-none w-1/2 mobile(M):w-full mobile(M):ml-0 ml-8`;
const ButtonParentDiv = tw.div`w-1/2 p-1 m-auto my-4`;
const Form = tw.form`p-5 mt-2 flex flex-col content-center mobile(M):ml-2`;

export const UserForm: FC<Props> = memo((props) => {
  const {nameDefaultValue, emailDefaultValue, genderDefaultValue,imageDefaultValue, userFormTitle, buttonName, afterLoginSuccess } = props;

  // エラーメッセージ用のステート
  const [errorNameMessages, setErrorNameMessages] = useState([]);
  const [errorEmailMessages, setErrorEmailMessages] = useState([]);
  const [errorPasswordMessages, setErrorPasswordMessages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector<RootState, User>(state => state.session.currentUser)

  const [name, setName] = useState<string>(nameDefaultValue);
  const [email, setEmail] = useState<string>(emailDefaultValue);
  const [gender, setGender] = useState<string>(genderDefaultValue);
  const [image, setImage] = useState<string | File | null | undefined >(imageDefaultValue);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const onChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => setName(e.target.value);
  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => setEmail(e.target.value);
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => setPassword(e.target.value);
  const onChangePasswordConfirmation: React.ChangeEventHandler<HTMLInputElement> = (e) => setPasswordConfirmation(e.target.value);
  const onChangeRadioButton: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => setGender(e.target.value), []);

  const selectImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.currentTarget.files !== null){
      setImage(e.currentTarget.files[0]);
    }else{
      setImage(undefined);
    };
  }, []);

  // 画像を投稿したり編集したりする可能性があるためFormData形式でデータを作成。
  const createFormData = (): FormData => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('password', password);
    formData.append('passwordConfirmation', passwordConfirmation);
    image && formData.append('image', image);
    return formData;
  };

  const userRegitAction =(e: React.FormEvent<HTMLFormElement>) => {
    const user = createFormData();
    // 新規登録機能の際の挙動
    if (afterLoginSuccess !== undefined){
      formDataClient.post('signup', user).then(response => {
        afterLoginSuccess !== undefined && afterLoginSuccess(response.data.user);
      }).catch(error => {
        const {password, name, email} = error.response.data.errorMessages
        // エラーメッセージをセットする。
        name !== undefined && setErrorNameMessages(name);
        email !== undefined && setErrorEmailMessages(email);
        password !== undefined && setErrorPasswordMessages(password);
        navigate(`./`, {state: {message: '登録に失敗しました。', type: 'error-message', condition: true}});
      });
    // ユーザー編集機能の挙動。
    } else if (afterLoginSuccess === undefined) {
      // guestユーザーは退会できなくする。
      if(currentUser.id === 1) {
        navigate(`./`, {state: {message: 'guestユーザーは情報を更新できません', type: 'error-message', condition: true}});
      }else{
        formDataClient.put(`users/${currentUser.id}`, user).then(response => {
            // 編集に成功したのでログイン情報も一緒に更新する。
            dispatch(setCurrentUser(response.data))
            // 画面遷移
            navigate(`/users/${response.data.id}`, {state: {message: '情報を更新しました', type: 'success-message', condition: true}});
        }).catch(error => {
          // 新規登録失敗
          const {password, name, email} = error.response.data.errorMessages
          // エラーメッセージをセットする。
          name !== undefined && setErrorNameMessages(name);
          email !== undefined && setErrorEmailMessages(email);
          password !== undefined && setErrorPasswordMessages(password);
          navigate(`./`, {state: {message: '更新に失敗しました。', type: 'error-message', condition: true}});
        });
      };
    };
    // イベントが明示的に処理されない場合にその既定のアクションを通常どおりに行うべきではないことを伝えます
    e.preventDefault();
  };

  return(
    <MainDiv>
      <Title>{userFormTitle}</Title>
      <ul className='mt-5'>
        {errorNameMessages.map((message)=><li className='text-red-500'>名前は{message}</li>)}
      </ul>
      <ul>
        {errorEmailMessages.map((message)=><li className='text-red-500'>メールは{message}</li>)}
      </ul>
      <ul>
        {errorPasswordMessages.map((message)=><li className='text-red-500'>パスワードは{message}</li>)}
      </ul>
      <Form onSubmit={userRegitAction}>
        <Input data-e2e='user-form-name-input' placeholder='名前を入力' value={name} onChange={onChangeName} />
        <Input data-e2e='user-form-email-input' placeholder='メールアドレス入力' value={email} onChange={onChangeEmail}/>
        <Input data-e2e='user-form-password-input' placeholder='パスワード入力' value={password} onChange={onChangePassword}/>
        <Input data-e2e='user-form-passwordConfirmation-input' placeholder='パスワード再入力' value={passwordConfirmation} onChange={onChangePasswordConfirmation} />
        <RadioArea gender={gender} onChangeRadioButton={onChangeRadioButton} />
        <ImageForm selectImage={selectImage} />
        <ButtonParentDiv>
          <BaseButton dataE2e='user-form-button'>{buttonName}</BaseButton>
        </ButtonParentDiv>
      </Form>
      <DeactivateAcountButton />
      <div className='text-center mb-5'>
        <Link to='/login'>ログインはこちら</Link>
      </div>
    </MainDiv>
  );
});