import { memo, useEffect, useState, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";

type Props ={
  duringSpot: AddressAndDateSpotJoinData
};

const Image = tw.img`w-48 h-48 rounded-xl border-4 border-pink-400 hover:border-pink-600`;

export const DuringSpotCard: VFC<Props> = memo((props) => {
  const { duringSpot } = props;
  const noImage = `${process.env.PUBLIC_URL}/no_image.jpg`;
  const [ duringSpotImage, setDuringSpotImage] = useState(noImage);

  useEffect(() => {
    duringSpot.dateSpot.image && duringSpot.dateSpot.image.url && setDuringSpotImage(duringSpot.dateSpot.image.url);
  }, [duringSpot]);

  return(
    <div className="bg-white rounded-xl shadow-xl p-2 my-2">
      <Link to={`/dateSpots/${duringSpot.dateSpot.id}`}>
        <Image src={duringSpotImage} alt='DateSpotProfileImage' />
      </Link>
      <div className="text-xs text-center">
        <Link to={`/dateSpots/${duringSpot.dateSpot.id}`}>
          <div className="my-2">{duringSpot.dateSpot.name}</div>
        </Link>
        <div className="my-2">{duringSpot.cityName}</div>
      </div>
    </div>
  );
});