class Api::V1::HomesController < ApplicationController
  def top
    render status: :ok, json: {
      areas: Area.all,
      main_prefectures: Prefecture.majors,
      main_genres: Genre.majors,
      genres: Genre.all,
      address_and_date_spots: Address.includes(date_spot: :date_spot_reviews).all.map { |address| AddressSerializer.new(address) }
    }
  end
end
