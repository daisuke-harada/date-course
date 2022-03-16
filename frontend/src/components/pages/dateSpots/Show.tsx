import { memo, useEffect, useState, VFC } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState, loginStatusState } from "store/session"
import tw from "tailwind-styled-components";

import { client } from "lib/api/client";
import { BusinessHour } from "components/atoms/text/dateSpots/BusinessHour";
import { BaseButton } from "components/atoms/button/BaseButton"
import { Link } from "react-router-dom";
import { AddressResponseData, DateSpotResponseData } from "types/dateSpots/response";
import { Map } from "components/molecules/maps/Map";
import { DateSpotReviewArea } from "components/organisms/dateSpotReviews/DateSpotReviewArea";
import { StarRateText } from "components/atoms/layouts/StarRateText";
//import { DateSpotReviewAndUserResponseData } from "types/dateSpotReviews/response";

const MainDiv = tw.div`border border-black bg-white mt-10 m-20 p-5 rounded-2xl`;
const DateSpotNameTitle = tw.h1`w-full m-5 text-sm font-bold md:text-3xl`;
const SubDiv = tw.div`md:flex-row flex-col w-full flex`;
const ImageParentDiv = tw.div`h-96 relative pt-20`;
const Image = tw.img`object-cover absolute top-0 w-full h-full rounded-2xl`;
const SubArea = tw.div`md:w-1/2 w-full`;

export const Show: VFC = memo(() => {
  const { id } = useParams();
  const [dateSpot, setDateSpot] = useState<DateSpotResponseData>();
  const [address, setAddress] = useState<AddressResponseData>();
  const [dateSpotReviews, setDateSpotReviews] = useState([]);
  const [genreName, setGenreName] = useState<string>('');
  const [dateSpotImage, setDateSpotImage] = useState('http://localhost:7777/images/no_image.jpg');
  const [dateSpotAverageRate, setDateSpotAverageRate] = useState(0);

  const getCurrentUser = useRecoilValue(currentUserState);
  const getLoginStatus = useRecoilValue(loginStatusState);

  useEffect(() => {
    client.get(`date_spots/${id}`).then(response => {
      setDateSpot(response.data.dateSpot);
      response.data.dateSpot.image.url !== null && setDateSpotImage(response.data.dateSpot.image.url);
      setAddress(response.data.address);
      setGenreName(response.data.genreName);
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
            <DateSpotNameTitle>{dateSpot?.name}</DateSpotNameTitle>
            <div className='flex'>
              <StarRateText rate={dateSpotAverageRate} size={60} />
              <div className='ml-2 font-bold pt-14'>評価{dateSpotAverageRate}</div>
            </div>
            <BusinessHour openingTime={dateSpot?.openingTime} closingTime={dateSpot?.closingTime} />
            <div className="m-5 text-sm font-bold md:text-xl">
              {address?.cityName}
            </div>
            <div className="m-5 text-sm font-bold md:text-xl">
              {genreName}
            </div>
            <div className="text-center">
              {
                getLoginStatus.status === true
                && getCurrentUser.user.admin === true
                && (
                  <BaseButton dataE2e="render-dateSpot-edit">
                    <Link
                      className="text-white"
                      to={`edit`}
                      state={{address: address, dateSpot: dateSpot}}
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
              (address && dateSpot)
              &&
              <Map address={address} dateSpotName={dateSpot.name}/>
            }
          </SubArea>
        </SubDiv>
      </MainDiv>
      <MainDiv>
        {
          dateSpot
          &&
          <DateSpotReviewArea
            dateSpotId={dateSpot.id}
            dateSpotReviews={dateSpotReviews}
            setDateSpotReviews={setDateSpotReviews}
            setDateSpotAverageRate={setDateSpotAverageRate}
          />
        }
      </MainDiv>
    </>
  );
});