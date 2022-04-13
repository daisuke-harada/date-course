import { memo, useEffect, useState, VFC } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';

type Props ={
  duringSpot: AddressAndDateSpotJoinData
};

const Image = tw.img`w-32 h-32 m-auto rounded-xl border-4 border-pink-400 hover:border-pink-600`;
const MainDiv= tw.div`bg-white rounded-xl shadow-xl p-2 m-2 w-36`;

export const DuringSpotCard: VFC<Props> = memo((props) => {
  const { duringSpot } = props;
  const noImage = `${process.env.PUBLIC_URL}/no_image.jpg`;
  const [ duringSpotImage, setDuringSpotImage] = useState(noImage);

  useEffect(() => {
    duringSpot.dateSpot.image && duringSpot.dateSpot.image.url && setDuringSpotImage(duringSpot.dateSpot.image.url);
  }, [duringSpot]);

  return(
    <MainDiv>
      <Link to={`/dateSpots/${duringSpot.dateSpot.id}`}>
        <Image src={duringSpotImage} alt='DateSpotProfileImage' />
      </Link>
      <div className='text-center text-xs'>
        <Link to={`/dateSpots/${duringSpot.dateSpot.id}`}>
          <div className='my-2 font-bold'>{duringSpot.dateSpot.name}</div>
        </Link>
      </div>
    </MainDiv>
  );
});