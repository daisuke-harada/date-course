import { memo, ReactNode, VFC } from "react";
import tw from 'tailwind-styled-components';

type Props = {
  children: ReactNode,
}

const MainDiv = tw.div`border border-black bg-white m-5 p-5`

export const Card: VFC<Props> = memo((props) => {
  const { children } = props;
  return(
    <MainDiv>
      {children}
    </MainDiv>
  );
});