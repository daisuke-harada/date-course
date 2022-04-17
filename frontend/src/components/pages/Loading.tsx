import { memo, ReactNode, useEffect, useState, VFC } from 'react';
import ReactLoading from 'react-loading';

type Props ={
  children: ReactNode
  loadingSwitch: boolean
}

export const Loading: VFC<Props> = memo((props) => {
  const { children, loadingSwitch } = props;
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    setIsLoading(loadingSwitch);
  }, [loadingSwitch]);

  if (isLoading){
    return(
      <div className='flex justify-center items-center h-screen'>
        <ReactLoading
          type='spin'
          color="#ebc634"
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