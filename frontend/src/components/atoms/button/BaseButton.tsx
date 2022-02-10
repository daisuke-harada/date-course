import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode
  addClassNames: string
}
export const BaseButton: VFC<Props> = memo((props) => {
  const {children, addClassNames} = props;
  return(
   <button className={`btn btn-salmon ${addClassNames}`}>{children}</button>
  );
});