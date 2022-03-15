import { memo, useEffect, useState, VFC } from "react";
import tw from 'tailwind-styled-components';
import { Card } from "components/atoms/card/Card";
import { AddressAndDateSpotJoinData, DateSpotResponseData } from "types/dateSpots/response";
import { genreDatas } from "datas/genreDatas";
import { Link } from "react-router-dom";

type Props = {
  addressAndDateSpot: AddressAndDateSpotJoinData
};

const DD = tw.dd`m-2 text-xs font-bold`;
const Title = tw.dd`m-2 font-bold`;
const Image = tw.img`w-64 h-64 rounded-xl border-4 border-pink-400 hover:border-pink-600`;

export const DateSpotCard: VFC<Props> = memo((props) => {
  const { addressAndDateSpot } = props;
  const dateSpot: DateSpotResponseData = addressAndDateSpot.dateSpot
  const [image, setImage] = useState('http://localhost:7777/images/no_image.jpg');
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
        <Link to={`/dateSpots/${dateSpot.id}`}>{dateSpot.name}</Link>
      </Title>
      <DD>
        {/* 口コミ */}
        コメント3件
      </DD>
      <DD>{addressAndDateSpot.cityName}</DD>
      <DD>{genre?.name}</DD>
    </Card>
  );
});