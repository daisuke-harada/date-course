import { memo, useCallback, useEffect, useState, VFC } from 'react';
import { useLocation } from 'react-router-dom';
import tw  from 'tailwind-styled-components';

type FlashMessageData = {
  message: string,
  type: string,
  condition: boolean
};

const MessageDiv = tw.div`fixed duration-1000 z-50 right-0 rounded-2xl text-white text-md mt-5 mr-1 p-2`;

export const FlashMessage: VFC = memo(() => {

  // 初期値の際には画面外にフラッシュメッセージは存在している。
  const [condition, setCondition] = useState('translate-x-96');
  const location = useLocation();
  const state = location.state as FlashMessageData;
  // メッセージのスライド
  const messageSwitch = useCallback(()=> {
    // メッセージを横軸にスライドさせて表示する。
    state !== null && setCondition('translate-x-0');
    // 2行後にメッセージをスライドさせて画面外に隠す。
    state !== null && setTimeout(() => setCondition('translate-x-96'),2000);
  }, [state]);

  useEffect(
    // 文字が表示されている状態に戻す
    messageSwitch,[messageSwitch]
  );

  return (
    <>
      {(state !== null && condition) && <MessageDiv  className={ state.type + ' ' + condition }>{ state.message }</MessageDiv>}
    </>
  );
});