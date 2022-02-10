import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
  buttonSize: string;
};

export const GuestLoginButton: VFC<Props> = memo((props) => {
  const {children, buttonSize} = props;
  return(
   <button className={`btn btn-yellow-green ${buttonSize}`}>{children}</button>
  );
});