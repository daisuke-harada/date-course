import { memo, useEffect, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';

import { StarRateText } from 'components/atoms/text/StarRateText';
import { AddCourseButton } from 'components/atoms/button/courses/AddCourseButton';
import { Card } from 'components/atoms/card/Card';
import { AddressAndDateSpotJoinData, DateSpotResponseData } from 'types/dateSpots/response';
import { genreDatas } from 'datas/genreDatas';

type Props = {
  addressAndDateSpot: AddressAndDateSpotJoinData
};

const DD = tw.dd`w-56 m-2 text-xs font-bold`;
const Title = tw.dd`m-2 font-bold`;
const Image = tw.img`w-52 h-52 m-auto rounded-xl border-4 border-pink-400 hover:border-pink-600 hover:scale-105 duration-75`;

export const DateSpotCard: VFC<Props> = memo((props) => {
  const { addressAndDateSpot } = props;
  const dateSpot: DateSpotResponseData = addressAndDateSpot.dateSpot;
  const noImageUrl = `${process.env.PUBLIC_URL}/no_image.jpg`;
  const [image, setImage] = useState(noImageUrl);
  const genre = genreDatas.find(genreData => genreData.id === dateSpot.genreId);

  useEffect(() => {
    dateSpot.image && dateSpot.image.url && setImage(dateSpot.image.url);
  }, [dateSpot]);

  return(
    <Card>
      <DD>
        <Link to={`/dateSpots/${dateSpot.id}`}>
          <Image src={image} alt='DateSpotImage' />
        </Link>
      </DD>
      <Title>
        <Link to={`/dateSpots/${dateSpot.id}`}>
          <div className='w-52 overflow-x-scroll whitespace-nowrap pb-2'>
            {dateSpot.name}
          </div>
        </Link>
      </Title>
      <div className='flex justify-center'>
        <StarRateText rate={addressAndDateSpot.averageRate} size={24} />
      </div>
      <DD>
        <Link to={`/dateSpots/${dateSpot.id}`}>
          レビュー{addressAndDateSpot.reviewTotalNumber}件
        </Link>
      </DD>
      <DD>
        <div className='pb-2 overflow-x-scroll whitespace-nowrap'>
          {addressAndDateSpot.cityName}
        </div>
      </DD>
      <DD>
        <Link to={`/genres/${genre?.id}`}>
          {genre?.name}
        </Link>
      </DD>
      <DD><AddCourseButton addressAndDateSpot={addressAndDateSpot} /></DD>
    </Card>
  );
});