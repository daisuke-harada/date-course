import { memo, VFC } from "react";
import tw from 'tailwind-styled-components';
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";
import { DateSpotCard } from "components/organisms/card/dateSpots/DateSpotCard";

const MaindDiv = tw.div`p-5 mb-5 shadow-xl bg-white border-2 rounded-3xl border-gray-200`;
const Img = tw.img`w-20 h-20 m-auto`;
const NumberDiv = tw.div`w-20 h-20 pt-6 text-3xl text-center m-auto`;

type Props = {
  addressAndDateSpots: Array<AddressAndDateSpotJoinData>
}

export const DateSpotRanking: VFC<Props> = memo((props) => {
  const { addressAndDateSpots } = props;
  // const no1Image = `${process.env.PUBLIC_URL}/no1.jpg`;
  const top5 = addressAndDateSpots.sort((a, b) => (a.averageRate > b.averageRate ? -1 : 1)).slice(0, 5);

  return(
    <MaindDiv>
      <div className='w-full m-2 text-center font-bold'>全国の人気ランキング</div>
      <div className='m-auto flex overflow-x-scroll whitespace-nowrap'>
        {
          top5.map((addressAndDateSpot: AddressAndDateSpotJoinData, index) => (
            <div key={addressAndDateSpot.id} className='flex flex-col'>
              <span className='text-xl text-center font-bold'>
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
