import { memo, ReactNode, VFC } from 'react';
import tw from 'tailwind-styled-components';

type Props = {
  children: ReactNode,
}

const MainDl = tw.dl`min-w-max text-center rounded-xl shadow-xl bg-white mx-6 mb-5 border-2`

export const Card: VFC<Props> = memo((props) => {
  const { children } = props;
  return(
    <MainDl>
      {children}
    </MainDl>
  );
});