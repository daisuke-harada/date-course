import { client } from "lib/api/client";
import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import tw from 'tailwind-styled-components';

import { currentUserState, loginStatusState } from "store/session";

import { DangerButton } from "./DangerButton";

const ButtonParentDiv = tw.div`text-center p-1 mx-6 my-4`;

export const DeactivateAccoutButton: VFC = memo(() => {
  const [loginStatus, setLoginStatus] = useRecoilState(loginStatusState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const navigate = useNavigate();

  const onCLickDeactivateAccountAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    client.delete(`users/${currentUser.user.id}`).then(response => {
      response.data.status === 'delete' && navigate('/', {state: {message: '退会しました', type: 'success-message', condition: true}} );
      response.data.status === 'delete' && setLoginStatus({status: false}) && setCurrentUser({user:{}});
    });
  };

  return(
    <>
      { loginStatus.status === true
        &&
        <ButtonParentDiv>
          <DangerButton onClickEvent={onCLickDeactivateAccountAction}>退会</DangerButton>
        </ButtonParentDiv>
      }
    </>
  );

});