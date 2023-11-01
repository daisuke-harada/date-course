import { memo, useEffect, useState, VFC } from 'react';
import tw from 'tailwind-styled-components';
import { SetterOrUpdater } from 'recoil';

import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { Link } from 'react-router-dom';
import { StarRateText } from 'components/atoms/text/StarRateText';
import { client } from 'lib/api/client';
import { ChangeSelect } from 'components/molecules/select/managementCourses/ChangeSelect';
import { ManagementCourseData } from 'types/managementCourses/management';
import { DeleteCourseButton } from 'components/atoms/button/courses/DeleteCourseButton';

type Props = {
  courseDuringSpot: AddressAndDateSpotJoinData,
  managementCourses: ManagementCourseData,
  setManagementCourses?: SetterOrUpdater<ManagementCourseData>,
  courseNumber: number,
  leg?: {
    duration: string;
    distance: string;
  }
};

const DD = tw.dd`m-2 text-xs font-bold`;
const Title = tw.dd`m-2 font-bold`;
const Image = tw.img`xl:w-60 lg:w-56 lg:h-56 md:w-40 md:h-40 w-32 h-32 mx-auto rounded-xl border-4 border-pink-400 hover:border-pink-600 hover:scale-105 duration-75`;
const MainDl = tw.dl`xl:w-64 lg:w-60 w-44 text-center rounded-xl shadow-xl bg-white py-1 border m-auto`
const RoadDiv = tw.div`xl:w-64 lg:w-60 md:w-44 md:h-32 m-auto flex justify-center`;

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
          <div className='flex justify-center'>
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
            managementCourses.courseDuringSpots.length > 1
            && addressAndDateSpot
            && setManagementCourses
            &&
            <ChangeSelect
              currentDateSpotId={addressAndDateSpot.dateSpot.id}
              managementCourses={managementCourses}
              setManagementCourses={setManagementCourses}
            />
          }
        </DD>
        <DD>
          {
            setManagementCourses
            &&
            <DeleteCourseButton  addressAndDateSpot={courseDuringSpot} />
          }
        </DD>
      </MainDl>
      {
        managementCourses
        &&
        managementCourses.courseDuringSpots.length !== courseNumber + 1
        &&
        <RoadDiv>
          <div className='border-r-4 border-indigo-500 w-1/2'>
          </div>
          <div className='w-1/2 p-2 text-xs font-bold flex flex-col'>
            <span className='px-1'>
              距離
            </span>
            <span className='p-1 pb-1 mb-2'>
              {leg?.distance}
            </span>
            <span className='px-1'>
              所要時間
            </span>
            <span className='px-1 pb-1'>
              {leg?.duration}
            </span>
          </div>
        </RoadDiv>
      }
    </>
  );
});
