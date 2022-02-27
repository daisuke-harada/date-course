import { memo, VFC } from "react";
import tw from 'tailwind-styled-components';

import { useDeactivateAccountButtonAction } from "hooks/useDeactivateAccountButtonAction";
import { DangerButton } from "./DangerButton";

const ButtonParentDiv = tw.div`text-center p-1 mx-6 my-4`;

export const DeactivateAcountButton: VFC = memo(() => {
  const { onCLickDeactivateAccountAction, loginStatus }= useDeactivateAccountButtonAction();

  return(
    <>
      {loginStatus.status === true &&
        <ButtonParentDiv>
          <DangerButton onClickEvent={onCLickDeactivateAccountAction}>退会</DangerButton>
        </ButtonParentDiv>
      }
    </>
  );

});