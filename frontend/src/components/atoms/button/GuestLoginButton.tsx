import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};

export const GuestLoginButton: VFC<Props> = memo((props) => {
  const {children} = props;
  return(
   <button className={`btn btn-yellow-green`}>{children}</button>
  );
});