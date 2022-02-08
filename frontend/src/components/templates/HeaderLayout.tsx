import { memo, ReactNode, VFC } from "react";
import { Header } from "../organisms/layout/Header";
type Props = {
  // childrenなどのタグで囲ったものを受け取るときはReactNodeで良い。
  children: ReactNode;
}

export const HeaderLayout: VFC<Props> = memo((props) => {
  const { children } = props;
  return(
    <>
      <Header />
        <div className="lg:pt-32 pt-24">
          { children }
        </div>
    </>
  );
});