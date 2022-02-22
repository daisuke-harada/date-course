import { memo, useCallback, useState, VFC } from "react";
import { Link, useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

import { client } from "lib/api/client";
import { SignUpParams} from "types/api/session";
import { BaseButton } from "components/atoms/button/BaseButton";
import { DangerButton } from "components/atoms/button/DangerButton";
import { RadioField } from "components/molecules/users/RadioField";
import { UserLoginResponseData } from "types/api/response";

const MainDiv = tw.div`user-form`;
const Title = tw.h1`text-center font-bold`;
const Input = tw.input`my-5 w-full border-b-2 outline-none`;
const ButtonParentDiv = tw.div`text-center p-1 mx-6 my-4`;
const Form = tw.form`p-5 m-2`

type Props = {
  userDefaultValue: string,
  emailDefaultValue: string,
  genderDefaultValue: string,
  apiUrl: string,
  userFormTitle: string,
  buttonName: string,
  afterLoginSuccess: (data: UserLoginResponseData) => void,
};

export const UserForm: VFC<Props> = memo((props) => {
  const {userDefaultValue, emailDefaultValue, genderDefaultValue, apiUrl, userFormTitle, buttonName, afterLoginSuccess } = props;

  // エラーメッセージ用のステート
  const [errorNameMessages, setErrorNameMessages] = useState([]);
  const [errorEmailMessages, setErrorEmailMessages] = useState([]);
  const [errorPasswordMessages, setErrorPasswordMessages] = useState([]);

  const navigate = useNavigate();

  const [name, setName] = useState<string>(userDefaultValue);
  const [email, setEmail] = useState<string>(emailDefaultValue);
  const [gender, setGender] = useState<string>(genderDefaultValue);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const onChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => setName(e.target.value);
  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => setEmail(e.target.value);
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => setPassword(e.target.value);
  const onChangePasswordConfirmation: React.ChangeEventHandler<HTMLInputElement> = (e) => setPasswordConfirmation(e.target.value);
  const onChangeRadioButton: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => setGender(e.target.value), []);

  // ここのプロパティ名は渡したいparamの名前と同じにする
  const user: SignUpParams = {
    name: name,
    email: email,
    gender: gender,
    password: password,
    passwordConfirmation: passwordConfirmation
  };

  const userRegitAction =(e: React.FormEvent<HTMLFormElement>) => {
    client.post(apiUrl, {user}).then(response => {
      // 新規登録成功
      response.data.status === 'created' && afterLoginSuccess(response.data)
      // 新規登録失敗
      if(response.data.status === 500){
        // エラーメッセージをセットする。
        setErrorNameMessages(response.data.errorMessages.name);
        setErrorEmailMessages(response.data.errorMessages.email);
        setErrorPasswordMessages(response.data.errorMessages.password);
        navigate(`./`, {state: {message: '登録に失敗しました。', type: 'error-message', condition: true}});
      };
    }).catch(error => {
        console.log("registration error", error)
    });
    // イベントが明示的に処理されない場合にその既定のアクションを通常どおりに行うべきではないことを伝えます
    e.preventDefault();
  };
  return(
    <MainDiv>
      <Title>{userFormTitle}</Title>
      <ul className="mt-5">
        {errorNameMessages !== [] && errorNameMessages.map((message)=><li className="text-red-500">名前は{message}</li>)}
      </ul>
      <ul>
        {errorEmailMessages !== [] && errorEmailMessages.map((message)=><li className="text-red-500">メールは{message}</li>)}
      </ul>
      <ul>
        {errorPasswordMessages !== [] && errorPasswordMessages.map((message)=><li className="text-red-500">パスワードは{message}</li>)}
      </ul>
      <Form onSubmit={userRegitAction}>
        <Input placeholder="名前を入力" value={name} onChange={onChangeName} />
        <Input placeholder="メールアドレス入力" value={email} onChange={onChangeEmail}/>
        <Input placeholder="パスワード入力" value={password} onChange={onChangePassword}/>
        <Input placeholder="パスワード再入力" value={passwordConfirmation} onChange={onChangePasswordConfirmation} />
        <RadioField gender={gender} onChangeRadioButton={onChangeRadioButton} />
        <ButtonParentDiv>
          <BaseButton>{buttonName}</BaseButton>
        </ButtonParentDiv>
        <ButtonParentDiv>
          <DangerButton>退会</DangerButton>
        </ButtonParentDiv>
      </Form>
      <div className="text-center p-1">
        <Link to="/login">ログインはこちら</Link>
      </div>
    </MainDiv>
  );
});