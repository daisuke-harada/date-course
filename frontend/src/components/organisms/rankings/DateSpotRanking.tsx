import { memo, useEffect, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { DateSpotCard } from 'components/organisms/card/dateSpots/DateSpotCard';
import { prefectureDatas } from 'datas/prefectureDatas';
import { genreDatas } from 'datas/genreDatas';
import { businessTimeDatas } from 'datas/businessTimeDatas';

const MaindDiv = tw.div`p-5 mb-5 shadow-xl bg-white border-2 rounded-3xl border-gray-200`;
const Img = tw.img`w-20 h-20 m-auto`;
const NumberDiv = tw.div`w-20 h-20 pt-6 text-3xl text-center m-auto`;

type Props = {
  addressAndDateSpots: Array<AddressAndDateSpotJoinData>
  prefectureId?: string,
  genreId?: string,
  comeTime?: string,
  dateSpotSearchName?: string
}

export const DateSpotRanking: VFC<Props> = memo((props) => {
  const { addressAndDateSpots, prefectureId, genreId, comeTime, dateSpotSearchName } = props;
  const top5 = addressAndDateSpots.sort((a, b) => (a.averageRate > b.averageRate ? -1 : 1)).slice(0, 5);
  const [array, setArray] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    const readyArray = [];
    prefectureId && readyArray.push(prefectureDatas.find((data) => (data.id === Number(prefectureId)))?.name);
    genreId && readyArray.push(genreDatas.find((data) => (data.id === Number(genreId)))?.name);
    comeTime && readyArray.push(`来店希望時間 ${businessTimeDatas.find((data) => (data.value_time === comeTime))?.time}`);
    setArray(readyArray);
  }, [prefectureId, genreId, comeTime]);

  return(
    <MaindDiv>
        {
          dateSpotSearchName?
          // 名前で検索した場合のランキング
          <div className='w-full m-2 text-center font-bold'>
            検索結果: '{dateSpotSearchName}'の人気ランキング
          </div>
          :
          (
            array.length !== 0?
            // 条件検索をした場合のランキング
            <div className='w-full pb-3 m-2 text-center font-bold overflow-x-scroll whitespace-nowrap'>
              検索結果: {array.join(',')}の人気ランキング
            </div>
            :
            // 何も条件が入力されていない場合のランキング
            <div className='w-full m-2 text-center font-bold'>
              全国の人気ランキング
            </div>
          )
        }
      <div className='m-auto flex overflow-x-scroll whitespace-nowrap'>
        {
          top5.map((addressAndDateSpot: AddressAndDateSpotJoinData, index) => (
            <div key={addressAndDateSpot.id} className='flex flex-col'>
              <span className='text-xl text-center'>
                {
                  index + 1 === 1 || index + 1 === 2 || index + 1 === 3 ?
                  <Img src={`${process.env.PUBLIC_URL}/no${index + 1}.jpg`} alt={`no${index + 1}Image`} />
                  :
                  <NumberDiv>
                    {index + 1}
                  </NumberDiv>
                }
              </span>
              <DateSpotCard key={addressAndDateSpot.dateSpot.id} addressAndDateSpot={addressAndDateSpot} />
            </div>
          ))
        }
      </div>
    </MaindDiv>
  );
});
