import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode
}
export const SecondaryButton: VFC<Props> = memo((props) => {
  const {children} = props;
  return(
   <button className="btn btn-pink">{children}</button>
  );
});