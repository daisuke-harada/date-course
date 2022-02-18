import { memo, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import tw  from "tailwind-styled-components";

const MessageDiv = tw.div`fixed right-0 rounded-2xl text-white text-md m-1 p-2`

export const FlashMessage: VFC = memo(() => {
  const [condition, setCondition] = useState(true);
  const location = useLocation();
  const state = location.state as { message: string, type: string, condition: boolean};

  // 変数の名前を変える
  const messageSwitch = ()=> {
    state !== null && setTimeout(() => setCondition(false),2000);
    state === null && (condition === false) && setCondition(true);
  };

  useEffect(
    messageSwitch,[messageSwitch]
  );
  console.log(condition);

  return (
    <>
      {(state !== null && condition) && <MessageDiv className={ state.type }>{ state.message }</MessageDiv>}
    </>
  );
});