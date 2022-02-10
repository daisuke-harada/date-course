import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode
  addClassNames: string
}
export const SecondaryButton: VFC<Props> = memo((props) => {
  const {children, addClassNames} = props;
  return(
   <button className={`btn btn-pink ${addClassNames}`}>{children}</button>
  );
});