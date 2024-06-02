import { useLoginAuthAction } from 'hooks/users/useLoginAuthAction';
import { memo, FC } from 'react';
import tw from 'tailwind-styled-components';

import { SignInParams } from 'types/users/session';

const Button = tw.button`btn btn-yellow-green w-full`;
const Span = tw.div`text-xs`;


export const GuestLoginButton: FC = memo(() => {
  const signInParams: SignInParams = {
    name: 'guest',
    password: 'foobar',
  };

  const { loginAction } = useLoginAuthAction(signInParams);

  return(
    <Button data-e2e='guest-login-button' onClick={loginAction}>ゲストログイン<Span>(簡単ログイン)</Span></Button>
  );
});