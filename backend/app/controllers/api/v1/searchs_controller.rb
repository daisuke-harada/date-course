class Api::V1::SearchsController < ApplicationController
  def date_spot_sort_search
    # genreとprefectureの検索を行う
    genre_prefecture_result = DateSpot.includes(:address).ransack(:address_prefecture_id_eq => params[:prefecture_id], :genre_id_eq => params[:genre_id]).result

    # デートスポットの営業開始時刻がcome_timeの時刻より、早い時刻を検索する。
    opening_time_search = genre_prefecture_result.ransack(opening_time_lteq: params[:come_time]).result

    # opening_time_searchの検索結果からデートスポットの営業終了時刻がcome_timeの遅刻より、遅い時刻を検索する
    date_spot_search_params_decided = opening_time_search.ransack(closing_time_gteq: params[:come_time]).result
    @address_and_date_spots = date_spot_search_params_decided.map do |date_spot|
      address_and_date_spot_and_genre_name(Address.find_by(date_spot_id: date_spot.id))
    end

    render json: {status: 'success', address_and_date_spots: @address_and_date_spots }
  end

  def name_search
    
  end
end
