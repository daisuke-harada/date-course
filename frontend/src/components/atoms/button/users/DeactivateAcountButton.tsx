import { memo, FC } from 'react';
import tw from 'tailwind-styled-components';

import { useDeactivateAccountButtonAction } from 'hooks/users/useDeactivateAccountButtonAction';

const ButtonParentDiv = tw.div`text-center p-1 mx-6 my-4`;

export const DeactivateAcountButton: FC = memo(() => {
  const { onCLickDeactivateAccountAction, loginStatus }= useDeactivateAccountButtonAction();

  return(
    <>
      {
        loginStatus === true &&
        <ButtonParentDiv>
          <button className='text-red-600 hover:text-red-800 font-bold mb-5' onClick={onCLickDeactivateAccountAction}>退会</button>
        </ButtonParentDiv>
      }
    </>
  );

});