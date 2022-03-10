import { memo, useEffect, useState, VFC } from "react";
import { useParams } from "react-router-dom";
import tw from "tailwind-styled-components";

import { client } from "lib/api/client";
import { BusinessHour } from "components/atoms/text/dateSpots/BusinessHour";

const MainDiv = tw.div`border border-black bg-white mt-10 m-20 p-5 rounded-2xl`;
const DateSpotNameTitle = tw.h1`w-full m-5 text-sm font-bold md:text-3xl`;
const SubDiv = tw.div`w-full`;
const ImageParentDiv = tw.div`md:h-96 xl:m-20 2xl:m-40 m-0`;

export const Show: VFC = memo(() => {
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [dateSpotImage, setDateSpotImage] = useState('http://localhost:7777/images/no_image.jpg');
  const [openingTime, setOpeningTime] = useState();
  const [closingTime, setClosingTime] = useState();
  const [cityName, setCityName] = useState('');


  useEffect(() => {
    client.get(`date_spots/${id}`).then(response => {
      setName(response.data.dateSpot.name);
      setOpeningTime(response.data.dateSpot.openingTime);
      setClosingTime(response.data.dateSpot.closingTime);
      response.data.dateSpot.image.url && setDateSpotImage(response.data.dateSpot.image.url);
      setCityName(response.data.address.cityName);
    });
  }, [id]);

  return(
    <>
      <MainDiv>
        <DateSpotNameTitle>{name}</DateSpotNameTitle>
        <SubDiv>
          <ImageParentDiv>
            <img className='object-fill max-h-96 w-full rounded-2xl' src={dateSpotImage} alt='DateSpotProfileImage' />
          </ImageParentDiv>

          {/* <div className="w-full flex m-5" id = "date_spot_reviews_rate_average" >
            <img src ="<%= asset_url('date_spot_review_images/star-off.png') %>" id ="star-average-1" className ="w-14 h-14">
            <img src ="<%= asset_url('date_spot_review_images/star-off.png') %>" id ="star-average-2" className ="w-14 h-14">
            <img src ="<%= asset_url('date_spot_review_images/star-off.png') %>" id ="star-average-3" className ="w-14 h-14">
            <img src ="<%= asset_url('date_spot_review_images/star-off.png') %>" id ="star-average-4" className ="w-14 h-14">
            <img src ="<%= asset_url('date_spot_review_images/star-off.png') %>" id ="star-average-5" className ="w-14 h-14">
            <div className="mx-4 font-bold mt-3 md:text-3xl">評価</div>
            <div className="font-bold mt-3 md:text-3xl" id = "rate_average_number">
              <%= @date_spot_reviews_rate_average %>
            </div>
          </div> */}
        </SubDiv>

        {/* <div className="mx-5 my-10 text-sm font-bold md:text-xl">
          <%= render 'date_spot_business_hour', date_spot: @date_spot %>
        </div> */}
        <BusinessHour openingTime={openingTime} closingTime={closingTime} />
        <div className="m-5 text-sm font-bold md:text-xl">
          {cityName}
        </div>

        {/* <div className="mx-5 my-10 text-sm font-bold md:text-xl">
          <span className="font-bold">ジャンル:</span>
          <%= link_to @date_spot.genre.name, {:controller=>"date_spots",:action=>"index",:date_spot_search=>{:genre_id_eq=>"#{@date_spot.genre.id}"}}, as: :date_spot_search, className:"font-bold" %>
        </div> */}

        {/* <div className="h-96 m-auto" id="map" >
        </div> */}

        {/* <div className="text-center">
          <%= render 'management_date_spots/add_course', date_spot: @date_spot %>
          <%= link_to "デートスポットを編集する", edit_date_spot_path(@date_spot), className:"btn btn-salmon m-5" if admin_logged_in? %>
        </div> */}
      </MainDiv>

      {/* // <div className="border border-black mt-10 m-20">
      //   <div className="m-5">
      //     <%= link_to "レビューする", new_date_spot_date_spot_review_path(@date_spot), className: "btn btn-salmon" unless @current_user_date_spot_review %>
      //   </div>

      //   <!-- 非同期機能実装 -->
      //   <%= render 'date_spot_reviews/date_spot_review_profile', {date_spot_review: @current_user_date_spot_review, target_image: @current_user_date_spot_review.user, target_name: @current_user_date_spot_review.user.name } if @current_user_date_spot_review %>
      //   <% @reviews.each do |date_spot_review| %>
      //     <%= render 'date_spot_reviews/date_spot_review_profile', {date_spot_review: date_spot_review, target_image: date_spot_review.user, target_name: date_spot_review.user.name } %>
      //   <% end %>
      // </div> */}
    </>
  );
});