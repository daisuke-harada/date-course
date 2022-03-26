import { memo, useEffect, useState, VFC } from "react";
import tw from 'tailwind-styled-components';
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";
import { Link } from "react-router-dom";
import { StarRateText } from "components/atoms/layouts/StarRateText";
import { client } from "lib/api/client";

type Props = {
  addressAndDateSpotId: number,
  courseDuringSpotIdAndNames: Array<{dateSpotId: number, dateSpotName: string}>,
  courseNumber: number
};

const DD = tw.dd`m-2 text-xs font-bold`;
const Title = tw.dd`m-2 font-bold`;
const Image = tw.img`w-64 h-64 mx-auto mt-10 rounded-xl border-4 border-pink-400 hover:border-pink-600`;
const MainDl = tw.dl`text-center rounded-xl shadow-xl bg-white py-1 max-w-md`

export const CourseDuringSpotCard: VFC<Props> = memo((props) => {
  const { addressAndDateSpotId, courseDuringSpotIdAndNames, courseNumber  } = props;
  const [addressAndDateSpot, setAddressAndDateSpot] = useState<AddressAndDateSpotJoinData>();
  const noImageUrl = `${process.env.PUBLIC_URL}/no_image.jpg`;
  const [dateSpotImage, setDateSpotImage] = useState(noImageUrl);

  useEffect(() => {
    client.get(`date_spots/${addressAndDateSpotId}`).then(response => {
      console.log(response.data.addressAndDateSpot);
      response.data.addressAndDateSpot.dateSpot.image.url !== null && setDateSpotImage(response.data.addressAndDateSpot.dateSpot.image.url);
      setAddressAndDateSpot(response.data.addressAndDateSpot);
    });
  }, [addressAndDateSpotId]);
  console.log(courseDuringSpotIdAndNames);

  return(
    <>
      <MainDl>
        <DD>
          <Link to={`/dateSpots/${addressAndDateSpot?.dateSpot.id}`}>
            <Image src={dateSpotImage} alt='DateSpotImage' />
          </Link>
        </DD>
        <Title>
          <Link to={`/dateSpots/${addressAndDateSpot?.dateSpot.id}`}>{addressAndDateSpot?.dateSpot.name}</Link>
        </Title>
        {
          addressAndDateSpot &&
          <div className="flex justify-center">
            <StarRateText rate={addressAndDateSpot.averageRate} size={24} />
          </div>
        }
        <DD>
          <Link to={`/dateSpots/${addressAndDateSpot?.dateSpot.id}`}>
            レビュー{addressAndDateSpot?.reviewTotalNumber}件
          </Link>
        </DD>
        <DD>{addressAndDateSpot?.cityName}</DD>
        <DD>{addressAndDateSpot?.genreName}</DD>
      </MainDl>
      {
        courseDuringSpotIdAndNames.length !== courseNumber + 1
        &&
        <div className="h-16 w-full flex max-w-md justify-center">
          <div className="border-r-4 border-indigo-500 w-1/2">
          </div>
          <div className="p-5 w-1/2 text-sm">
            自転車
          </div>
        </div>
      }
    </>
  );
});