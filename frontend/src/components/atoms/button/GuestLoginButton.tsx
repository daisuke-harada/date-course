import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
  addClassNames: string;
};

export const GuestLoginButton: VFC<Props> = memo((props) => {
  const {children, addClassNames} = props;
  return(
   <button className={`btn btn-yellow-green ${addClassNames}`}>{children}</button>
  );
});