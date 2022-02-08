import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode
}
export const BaseButton: VFC<Props> = memo((props) => {
  const {children} = props;
  return(
   <button className="btn btn-salmon">{children}</button>
  );
});