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
import { defaultAddfressAndDateSpotJoinData } from 'datas/defaultAddressAndDateSpotJoinData';
import { Loading } from '../Loading';

const MainDiv = tw.div`border shadow-xl bg-white mt-10 p-3 rounded-2xl m-2`;
const DateSpotNameTitle = tw.h1`w-full my-5 text-sm font-bold md:text-3xl`;
const SubDiv = tw.div`md:flex-row flex-col w-full flex`;
const ImageParentDiv = tw.div`lg:mx-0 mx-auto lg:h-96 lg:w-96 mobile(M):h-80 mobile(M):w-80 h-64 w-64 relative`;
const Image = tw.img`object-cover absolute top-0 w-full h-full rounded-2xl`;
const SubArea = tw.div`md:w-1/2 w-full`;

export const Show: VFC = memo(() => {
  const { id } = useParams();
  const [addressAndDateSpot, setAddressAndDateSpot] = useState<AddressAndDateSpotJoinData>(defaultAddfressAndDateSpotJoinData);
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
    <Loading loadingSwitch={addressAndDateSpot.id === 0 && true}>
      <MainDiv>
        <SubDiv>
          <SubArea>
            <ImageParentDiv>
              <Image src={dateSpotImage} alt='DateSpotProfileImage' />
            </ImageParentDiv>
            <DateSpotNameTitle>{addressAndDateSpot?.dateSpot.name}</DateSpotNameTitle>
            <div className='flex flex-col'>
              <div className='ml-1 font-bold'>評価{dateSpotAverageRate}</div>
              <StarRateText rate={dateSpotAverageRate} size={50} />
            </div>
            <BusinessHour openingTime={addressAndDateSpot?.dateSpot.openingTime} closingTime={addressAndDateSpot?.dateSpot.closingTime} />
            <div className='mx-2 my-5 text-sm font-bold md:text-xl'>
              {addressAndDateSpot?.cityName}
            </div>
            <div className='mx-2 my-5 text-sm font-bold md:text-xl'>
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
    </Loading>
  );
});