import { memo, ReactNode, VFC } from 'react';

type Props = {
  sideArea: ReactNode,
  topArea: ReactNode,
  mainArea: ReactNode
}

export const IndexLayout: VFC<Props> = memo((props) => {
  const { sideArea, topArea, mainArea } = props;
  return(
    <div className='md:flex-row w-full flex flex-col'>
      <div className='md:block hidden w-3/12 pl-5 pt-5'>
        { sideArea }
      </div>
      <div className='md:hidden w-full'>
        { topArea }
      </div>
      <div className='md:w-9/12 w-full p-5'>
        { mainArea }
      </div>
    </div>
  );
});