import { memo, useEffect, useState, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentUserState, loginStatusState } from 'store/session'
import tw from 'tailwind-styled-components';

import { client } from 'lib/api/client';
import { BusinessHour } from 'components/atoms/text/dateSpots/BusinessHour';
import { BaseButton } from 'components/atoms/button/BaseButton'
import { Link } from 'react-router-dom';
import { AddressAndDateSpotJoinData } from 'types/dateSpots/response';
import { Map } from 'components/molecules/maps/Map';
import { DateSpotReviewArea } from 'components/organisms/area/dateSpotReviews/DateSpotReviewArea';
import { StarRateText } from 'components/atoms/layouts/StarRateText';

const MainDiv = tw.div`border shadow-xl bg-white mt-10 p-2 rounded-2xl m-2`;
const DateSpotNameTitle = tw.h1`w-full m-5 text-sm font-bold md:text-3xl`;
const SubDiv = tw.div`md:flex-row flex-col w-full flex`;
const ImageParentDiv = tw.div`h-96 relative pt-20`;
const Image = tw.img`object-cover absolute top-0 w-full h-full rounded-2xl`;
const SubArea = tw.div`md:w-1/2 w-full`;

export const Show: VFC = memo(() => {
  const { id } = useParams();
  const [addressAndDateSpot, setAddressAndDateSpot] = useState<AddressAndDateSpotJoinData>();
  const [dateSpotReviews, setDateSpotReviews] = useState([]);
  const noImageUrl = `${process.env.PUBLIC_URL}/no_image.jpg`;
  const [dateSpotImage, setDateSpotImage] = useState(noImageUrl);
  const [dateSpotAverageRate, setDateSpotAverageRate] = useState(0);

  const getCurrentUser = useRecoilValue(currentUserState);
  const getLoginStatus = useRecoilValue(loginStatusState);

  useEffect(() => {
    client.get(`date_spots/${id}`).then(response => {
      setAddressAndDateSpot(response.data.addressAndDateSpot);
      response.data.addressAndDateSpot.dateSpot.image.url !== null && setDateSpotImage(response.data.addressAndDateSpot.dateSpot.image.url);
      setDateSpotReviews(response.data.dateSpotReviews);
      setDateSpotAverageRate(response.data.reviewAverageRate);
    });
  }, [id]);

  return(
    <>
      <MainDiv>
        <SubDiv>
          <SubArea>
            <ImageParentDiv>
              <Image src={dateSpotImage} alt='DateSpotProfileImage' />
            </ImageParentDiv>
            <DateSpotNameTitle>{addressAndDateSpot?.dateSpot.name}</DateSpotNameTitle>
            <div className='flex'>
              <StarRateText rate={dateSpotAverageRate} size={60} />
              <div className='ml-2 font-bold pt-14'>評価{dateSpotAverageRate}</div>
            </div>
            <BusinessHour openingTime={addressAndDateSpot?.dateSpot.openingTime} closingTime={addressAndDateSpot?.dateSpot.closingTime} />
            <div className='m-5 text-sm font-bold md:text-xl'>
              {addressAndDateSpot?.cityName}
            </div>
            <div className='m-5 text-sm font-bold md:text-xl'>
              <Link to={`/genres/${addressAndDateSpot?.dateSpot.genreId}`}>
                {addressAndDateSpot?.genreName}
              </Link>
            </div>
            <div className='text-center'>
              {
                getLoginStatus.status === true
                && getCurrentUser.user.admin === true
                && (
                  <BaseButton dataE2e='render-dateSpot-edit'>
                    <Link
                      className='text-white'
                      to={`edit`}
                      state={{addressAndDateSpot: addressAndDateSpot}}
                    >
                      デートスポット情報編集
                    </Link>
                  </BaseButton>
                )
              }
            </div>
          </SubArea>
          <SubArea>
            {
              addressAndDateSpot
              &&
              <Map addressAndDateSpot={addressAndDateSpot} />
            }
          </SubArea>
        </SubDiv>
      </MainDiv>

      <MainDiv>
        {
          addressAndDateSpot
          &&
          <DateSpotReviewArea
            dateSpotId={addressAndDateSpot.dateSpot.id}
            dateSpotReviews={dateSpotReviews}
            setDateSpotReviews={setDateSpotReviews}
            setDateSpotAverageRate={setDateSpotAverageRate}
          />
        }
      </MainDiv>
    </>
  );
});