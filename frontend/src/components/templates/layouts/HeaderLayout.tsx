import { memo, ReactNode, FC } from 'react';

import { Header } from 'components/organisms/layout/Header';

type Props = {
  children: ReactNode;
}

export const HeaderLayout: FC<Props> = memo((props) => {
  const { children } = props;
  return(
    <>
      <Header />
        <div className='lg:pt-32 pt-20'>
          { children }
        </div>
    </>
  );
});