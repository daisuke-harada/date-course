import { memo, ReactNode, VFC } from "react";
import { Header } from "components/organisms/layout/Header";
import tw from "tailwind-styled-components";

type Props = {
  // childrenなどのタグで囲ったものを受け取るときはReactNodeで良い。
  children: ReactNode;
}

const Div = tw.div`lg:pt-32 pt-24`

export const HeaderLayout: VFC<Props> = memo((props) => {
  const { children } = props;
  return(
    <>
      <Header />
        <Div>
        { children }
        </Div>
    </>
  );
});