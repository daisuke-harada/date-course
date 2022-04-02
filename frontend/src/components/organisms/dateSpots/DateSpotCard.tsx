import { memo, useEffect, useState, VFC } from "react";
import tw from 'tailwind-styled-components';
import { Card } from "components/atoms/card/Card";
import { AddressAndDateSpotJoinData, DateSpotResponseData } from "types/dateSpots/response";
import { genreDatas } from "datas/genreDatas";
import { Link } from "react-router-dom";
import { StarRateText } from "components/atoms/layouts/StarRateText";
import { AddCourseButton } from "components/atoms/button/AddCourseButton";

type Props = {
  addressAndDateSpot: AddressAndDateSpotJoinData
};

const DD = tw.dd`m-2 text-xs font-bold`;
const Title = tw.dd`m-2 font-bold`;
const Image = tw.img`w-64 h-64 rounded-xl border-4 border-pink-400 hover:border-pink-600`;

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
        <Link to={`/dateSpots/${dateSpot.id}`}>{dateSpot.name}</Link>
      </Title>
      <div className="flex justify-center">
        <StarRateText rate={addressAndDateSpot.averageRate} size={24} />
      </div>
      <DD>
        <Link to={`/dateSpots/${dateSpot.id}`}>
          レビュー{addressAndDateSpot.reviewTotalNumber}件
        </Link>
      </DD>
      <DD>{addressAndDateSpot.cityName}</DD>
      <DD>{genre?.name}</DD>
      <DD><AddCourseButton addressAndDateSpot={addressAndDateSpot} /></DD>
    </Card>
  );
});