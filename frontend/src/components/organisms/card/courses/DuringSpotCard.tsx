import { memo, useEffect, useState, VFC } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';

type Props ={
  duringSpot: AddressAndDateSpotJoinData
};

const Image = tw.img`mobile(M):w-24 mobile(M):h-24 w-20 h-20 rounded-t-xl`;

export const DuringSpotCard: VFC<Props> = memo((props) => {
  const { duringSpot } = props;
  const noImage = `${process.env.PUBLIC_URL}/no_image.jpg`;
  const [ duringSpotImage, setDuringSpotImage] = useState(noImage);

  useEffect(() => {
    duringSpot.dateSpot.image && duringSpot.dateSpot.image.url && setDuringSpotImage(duringSpot.dateSpot.image.url);
  }, [duringSpot]);

  return(
      <Link className='bg-white rounded-xl shadow-xl m-1 mobile(M):w-24 w-20 hover:scale-105 duration-75' to={`/dateSpots/${duringSpot.dateSpot.id}`}>
        <Image src={duringSpotImage} alt='DateSpotProfileImage' />
        <div className='sm:block text-center text-xs font-bold overflow-x-scroll whitespace-nowrap pb-3 mobile(M):w-24 w-20'>
            <div className='my-2'>{duringSpot.dateSpot.name}</div>
        </div>
      </Link>
  );
});