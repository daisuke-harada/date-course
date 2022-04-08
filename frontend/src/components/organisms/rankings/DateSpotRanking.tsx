import { memo, VFC } from "react";
import tw from 'tailwind-styled-components';

const MaindDiv = tw.div`w-3/4 h-96 m-auto mt-6 bg-white border-2 rounded-3xl border-gray-200 justify-center flex py-1`;


export const DateSpotRanking: VFC = memo((props) => {

  return(
    <MaindDiv>
      <div>ランキング詳細</div>
    </MaindDiv>
  );
});