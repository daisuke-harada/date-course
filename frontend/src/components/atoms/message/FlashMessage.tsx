import { memo, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import tw  from "tailwind-styled-components";

const MessageDiv = tw.div`fixed duration-1000 right-0 rounded-2xl text-white text-md m-1 p-2`

export const FlashMessage: VFC = memo(() => {
  const [condition, setCondition] = useState('translate-x-0');
  const location = useLocation();
  const state = location.state as { message: string, type: string, condition: boolean};

  // メッセージのスライド
  const messageSwitch = ()=> {
    state !== null && setTimeout(() => setCondition('translate-x-96'),2000);
    state === null && (condition === 'translate-x-96') && setCondition('translate-x-0');
  };

  useEffect(
    messageSwitch,[messageSwitch]
  );
  console.log(condition);

  return (
    <>
      {(state !== null && condition) && <MessageDiv className={ state.type + ' ' + condition }>{ state.message }</MessageDiv>}
    </>
  );
});