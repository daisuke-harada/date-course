import { memo, VFC } from "react";
import tw from 'tailwind-styled-components';

const MaindDiv = tw.div`w-full mb-5 shadow-xl bg-white border-2 rounded-3xl border-gray-200`;


export const DateSpotRanking: VFC = memo((props) => {

  return(
    <MaindDiv>
      <div className='w-full m-2 text-center font-bold'>全国の人気ランキング</div>
      <div className='w-full m-auto flex justify-center'>
        <div className='w-1/3 m-2 h-64 rounded-xl bg-black'></div>
        <div className='w-1/3 m-2 h-64 rounded-xl bg-black'></div>
        <div className='w-1/3 m-2 h-64 rounded-xl bg-black'></div>
      </div>
    </MaindDiv>
  );
});
