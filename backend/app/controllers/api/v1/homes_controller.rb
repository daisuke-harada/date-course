class Api::V1::HomesController < ApplicationController
  def top
    render json: {
      areas: Area.all,
      main_prefectures: Prefecture.where(id: [13, 27, 40, 14, 23, 26]),
      main_genres: Genre.where(id: [1, 2, 3, 4, 5, 6]),
      genres: Genre.all,
      address_and_date_spots: Address.includes(date_spot: :date_spot_reviews).all.map { |address| AddressSerializer.new(address) }
    }
  end
end
