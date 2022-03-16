import { useLoginAuthAction } from "hooks/users/useLoginAuthAction";
import { memo, VFC } from "react";
import tw from "tailwind-styled-components";
import { SignInParams } from "types/users/session";

const Button = tw.button`btn btn-yellow-green w-full`;
const Span = tw.div`text-xs`;


export const GuestLoginButton: VFC = memo(() => {
  const signInParams: SignInParams = {
    name: "guest",
    password: "foobar",
  };

  const { loginAction } = useLoginAuthAction(signInParams);

  return(
    <Button onClick={loginAction}>ゲストログイン<Span>(簡単ログイン)</Span></Button>
  );
});