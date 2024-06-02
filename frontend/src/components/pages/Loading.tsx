import { memo, ReactNode, FC } from 'react';
import ReactLoading from 'react-loading';

type Props ={
  children: ReactNode
  loadingSwitch: boolean
}

export const Loading: FC<Props> = memo((props) => {
  const { children, loadingSwitch } = props;

  if (loadingSwitch){
    return(
      <div className='flex justify-center items-center h-screen'>
        <ReactLoading
          type='spin'
          color="#F87171"
          height="100px"
          width="100px"
          className="mx-auto"
        />
      </div>
    );
  }else {
    return <>{children}</>;
  }
});