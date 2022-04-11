import { memo, VFC } from "react";
import tw from 'tailwind-styled-components';
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";
import { DateSpotCard } from "components/organisms/card/dateSpots/DateSpotCard";

const MaindDiv = tw.div`p-5 mb-5 shadow-xl bg-white border-2 rounded-3xl border-gray-200`;

type Props = {
  addressAndDateSpots: Array<AddressAndDateSpotJoinData>
}

export const DateSpotRanking: VFC<Props> = memo((props) => {
  const { addressAndDateSpots } = props;
  console.log(addressAndDateSpots);
  const top5 = addressAndDateSpots.sort((a, b) => (a.averageRate > b.averageRate ? -1 : 1)).slice(0, 5);

  return(
    <MaindDiv>
      <div className='w-full m-2 text-center font-bold'>全国の人気ランキング</div>
      <div className='m-auto flex overflow-x-scroll whitespace-nowrap'>
        {
          top5.map((addressAndDateSpot: AddressAndDateSpotJoinData) => (<DateSpotCard key={addressAndDateSpot.dateSpot.id} addressAndDateSpot={addressAndDateSpot} />))
        }
      </div>
    </MaindDiv>
  );
});
