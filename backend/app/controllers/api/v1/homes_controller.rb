class Api::V1::HomesController < ApplicationController
  def top
    main_prefecture_ids = [13, 27, 40, 14, 23, 26]
    main_genre_ids = [1, 2, 3, 4, 5, 6]

    address_and_date_spots = Address.all.map do |address|
      address.combined_data_with_address_and_genre
    end

    render json: {
      areas: Area.all,
      main_prefectures: Prefecture.where(id: main_prefecture_ids),
      main_genres: Genre.where(id: main_genre_ids),
      genres: Genre.all,
      address_and_date_spots: address_and_date_spots
    }
  end
end
