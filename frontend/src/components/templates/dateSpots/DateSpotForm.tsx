import { memo, VFC } from "react";

export const DateSpotForm: VFC = memo((props) => {
  return (
    // エラーメッセージ
    // <%= f.label :name, "デートスポット名" %>
    // <%= f.text_field :name, class: "mb-5 border-b-2 outline-none w-full" %>

    // <%= f.label :address, "住所" %><br/>
    // <%= f.fields_for :address do |address| %>
    //   <p class="mb-5">
    //     <%= address.grouped_collection_select(:prefecture_id, Area.all, :prefectures, :name, :id, :name, prompt: "都道府県を選択してください") %>
    //   </p>
    //   <%= address.label :city_name, "市町村名、番地" %>
    //   <%= address.text_field :city_name, class: "mb-5 border-b-2 outline-none w-full" %>
    // <% end %>

    // <%= f.label :genre_id, "ジャンル" %><br/>
    // <p class="mb-5">
    //   <%= f.collection_select(:genre_id, Genre.all, :id, :name, prompt: "ジャンルを選択してください") %>
    // </p>

    // <label>営業時間</label><br/>
    // <p class="mb-5 border-b-2 outline-none">
    //   <%= f.label :opening_time, "始業時間" %>
    //   <%= f.collection_select :opening_time, BusinessTime.all, :value_time, :time %>
    //   ~
    //   <%= f.label :opening_time, "終業時間" %>
    //   <%= f.collection_select :closing_time, BusinessTime.all, :value_time, :time %>
    // </p>

  //   <%= f.label :image, "サムネイル"%>
  //   <%= f.file_field :image %>

  //   <div class="text-center p-1">
  //     <%= f.submit btn_name, class: "btn btn-salmon my-5" %>
  //   </div>
  // <% end %>
  );
});