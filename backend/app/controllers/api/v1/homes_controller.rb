class Api::V1::HomesController < ApplicationController
  def top
    @areas = Area.all
    @main_prefectures = Prefecture.find([13, 27, 40, 14, 23, 26])
    @main_genres = Genre.find([1, 2, 3, 4, 5, 6])
    @genres = Genre.all
    addresses = Address.all
    @address_and_date_spots = addresses.map do |address|
      address_and_date_spot_and_genre_name(address)
    end
    render json: { areas: @areas, main_prefectures: @main_prefectures, main_genres: @main_genres, genres: @genres, address_and_date_spots: @address_and_date_spots }
  end
end
