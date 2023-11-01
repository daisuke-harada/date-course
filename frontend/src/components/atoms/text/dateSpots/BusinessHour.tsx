import { memo, VFC } from 'react';
import tw from 'tailwind-styled-components';

type Props = {
  openingTime?: Date,
  closingTime?: Date
}

const MainDiv = tw.div`mx-2 my-10 text-sm font-bold md:text-xl`;


export const BusinessHour: VFC<Props> = memo((props) => {
  const { openingTime, closingTime } = props;

  // 年数や曜日の部分は除外して時間の部分だけ取り出す
  const fetchTime = (time: Date) => time.toString().substring(11, 16);
  if(openingTime && closingTime) {
    return(
      <MainDiv>
        <p className='font-bold'>営業時間</p>
        <p className='font-bold'>{fetchTime(openingTime)} ~ {fetchTime(closingTime)}</p>
      </MainDiv>
    );
  }else if(openingTime && closingTime === undefined){
    return(
      <MainDiv>
        <p className='font-bold'>営業時間</p>
        <p className='font-bold'>{fetchTime(openingTime)}から</p>
      </MainDiv>
    );
  }else if(openingTime === undefined && closingTime){
    return(
      <MainDiv>
        <p className='font-bold'>営業時間</p>
        <p className='font-bold'>{fetchTime(closingTime)}まで</p>
      </MainDiv>
    );
  }else{
    return(
      <MainDiv>営業時間は登録されていません</MainDiv>
    );
  };
});