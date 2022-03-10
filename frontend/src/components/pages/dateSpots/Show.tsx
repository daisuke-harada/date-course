import { client } from "lib/api/client";
import { memo, useEffect, useState, VFC } from "react";
import { useParams } from "react-router-dom";

export const Show: VFC = memo(() => {
  const { id } = useParams();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    client.get(`date_spots/${id}`).then(response => {
      setName(response.data.dateSpot.name);
    });
  }, []);

  return(
    <>
   <h1>デートスポットの詳細</h1>
   <div className="border border-black bg-white mt-10 m-20 p-5">
      {/* <h1 className="w-full m-5 text-sm font-bold md:text-3xl" id="date_spot_name">
        <%= @date_spot.name %>
      </h1> */}

      <div className="w-full h-1/2">
        {/* <div className="m-0 md:h-96 xl:m-20 2xl:m-40">
          <%= image_tag @date_spot.image.variant(gravity: :center) || 'no_image.jpg' , className:"object-fill max-h-96 w-full" %>
        </div> */}

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
      </div>

      {/* <div className="mx-5 my-10 text-sm font-bold md:text-xl">
        <%= render 'date_spot_business_hour', date_spot: @date_spot %>
      </div> */}

      {/* <div className="mx-5 my-10 text-sm font-bold md:text-xl">
        <span className="font-bold">ジャンル:</span>
        <%= link_to @date_spot.genre.name, {:controller=>"date_spots",:action=>"index",:date_spot_search=>{:genre_id_eq=>"#{@date_spot.genre.id}"}}, as: :date_spot_search, className:"font-bold" %>
      </div> */}

      {/* <div className="m-5 text-center text-sm font-bold md:text-xl" id="address">
        <%= @date_spot.address.city_name %>
      </div> */}

      {/* <div className="h-96 m-auto" id="map" >
      </div> */}

      {/* <div className="text-center">
        <%= render 'management_date_spots/add_course', date_spot: @date_spot %>
        <%= link_to "デートスポットを編集する", edit_date_spot_path(@date_spot), className:"btn btn-salmon m-5" if admin_logged_in? %>
      </div> */}
    </div>

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