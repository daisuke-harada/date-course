import { memo, ReactNode, VFC } from "react";
import tw from 'tailwind-styled-components';

type Props = {
  children: ReactNode,
}

const MainDl = tw.dl`text-center rounded-xl shadow-xl bg-white m-10`

export const Card: VFC<Props> = memo((props) => {
  const { children } = props;
  return(
    <MainDl>
      {children}
    </MainDl>
  );
});