import { memo, ReactNode, VFC } from 'react';

type Props = {
  sideArea: ReactNode,
  centerArea: ReactNode
}

export const IndexLayout: VFC<Props> = memo((props) => {
  const { sideArea, centerArea } = props;
  return(
    <div className='w-full flex'>
      <div className='md:block hidden w-3/12 p-5'>
        { sideArea }
      </div>
      <div className='md:w-9/12 w-full p-5'>
        { centerArea }
      </div>
    </div>
  );
});