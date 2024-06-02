import { memo, FC } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { HeaderBottomRoutes } from 'router/HeaderBottomRoutes';

const BottomUl = tw.ul`lg:flex hidden flex-wrap text-base justify-center font-bold`;
const BottomUlList = tw.li`my-3 mx-6`;

export const HeaderBottom: FC = memo(() => {
  return(
    <BottomUl>
      {HeaderBottomRoutes().map((route) => <BottomUlList key={route.path} data-e2e={route.dataE2e}> <Link className='text-black' to={route.path}>{route.text}</Link></BottomUlList>)}
    </BottomUl>
  );
});