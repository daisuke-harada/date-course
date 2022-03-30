import { memo, useEffect, useState, VFC } from "react";
import tw from 'tailwind-styled-components';
import { AddressAndDateSpotJoinData } from "types/dateSpots/response";
import { Link } from "react-router-dom";
import { StarRateText } from "components/atoms/layouts/StarRateText";
import { client } from "lib/api/client";
import { ChangeSelect } from "components/molecules/managementCourses/ChangeSelect";
import { ManagementCourse } from "types/managementCourses/management";
import { SetterOrUpdater } from "recoil";

type Props = {
  courseDuringSpot: AddressAndDateSpotJoinData,
  managementCourses: ManagementCourse,
  setManagementCourses: SetterOrUpdater<ManagementCourse>,
  courseNumber: number,
  leg?: {
    duration: string | undefined;
    distance: string | undefined;
  }
};

const DD = tw.dd`m-2 text-xs font-bold`;
const Title = tw.dd`m-2 font-bold`;
const Image = tw.img`w-64 h-64 mx-auto mt-10 rounded-xl border-4 border-pink-400 hover:border-pink-600`;
const MainDl = tw.dl`text-center rounded-xl shadow-xl bg-white py-1 max-w-md`

export const CourseDuringSpotCard: VFC<Props> = memo((props) => {
  const { courseDuringSpot, managementCourses, setManagementCourses, courseNumber, leg} = props;
  const [addressAndDateSpot, setAddressAndDateSpot] = useState<AddressAndDateSpotJoinData>();
  const noImageUrl = `${process.env.PUBLIC_URL}/no_image.jpg`;
  const [dateSpotImage, setDateSpotImage] = useState(noImageUrl);

  useEffect(() => {
    client.get(`date_spots/${courseDuringSpot.dateSpot.id}`).then(response => {
      response.data.addressAndDateSpot.dateSpot.image.url !== null && setDateSpotImage(response.data.addressAndDateSpot.dateSpot.image.url);
      setAddressAndDateSpot(response.data.addressAndDateSpot);
    });
  }, [courseDuringSpot.dateSpot.id]);

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
        <DD>
          {
            addressAndDateSpot &&
            <ChangeSelect
              currentDateSpotId={addressAndDateSpot.dateSpot.id}
              managementCourses={managementCourses}
              setManagementCourses={setManagementCourses}
            />
          }
        </DD>
      </MainDl>
      {
        managementCourses.courseDuringSpots.length !== courseNumber + 1
        &&
        <div className="h-16 w-full flex max-w-md justify-center">
          <div className="border-r-4 border-indigo-500 w-1/2">
          </div>
          <div className="w-1/2 p-2 text-sm font-bold flex flex-col">
            <span className='p-1'>距離{leg?.distance}</span>
            <span className='p-1'>所要時間{leg?.duration}</span>
          </div>
        </div>
      }
    </>
  );
});