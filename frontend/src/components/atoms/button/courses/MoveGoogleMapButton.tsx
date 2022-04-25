import { memo, VFC } from 'react';
import tw from 'tailwind-styled-components';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';


const Button = tw.button`btn bg-white text-black w-full border-2 border-gray-400 hover:border-gray-500 shadow-lg hover:shadow-none`;
const Image = tw.img`sm:w-7 sm:h-7 w-4 h-4 inline mr-1`;

type Props = {
  courseDuringSpots: AddressAndDateSpotJoinData[]
}

export const MoveGoogleMapButton: VFC<Props> = memo((props) => {
  const {courseDuringSpots} = props;
  const maps = courseDuringSpots.map((spot) => `${spot.cityName}/`);

  return(
    <a href={`https://maps.google.co.jp/maps/dir/${maps.map((cityName) => cityName)}`} target='_blank' rel='noopener noreferrer'>
      <Button>
        <Image src={`${process.env.PUBLIC_URL}/google-maps-icon.svg`} />
        GoogleMapで見る
      </Button>
    </a>
  );
});