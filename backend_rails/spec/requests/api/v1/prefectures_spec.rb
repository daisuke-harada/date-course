require "rails_helper"

RSpec.describe "Api::V1::Prefectures", type: :request do
  describe "GET /show" do
    let!(:address) { create(:address) }
    let(:date_spot) { address.date_spot }

    it "prevectureのidが40のデートスポットを表示する" do
      get "/api/v1/prefectures/40"
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["date_spot"]["name"]).to eq(date_spot.name)
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["date_spot"]["genre_id"]).to eq(date_spot.genre_id)
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["prefecture_name"]).to eq(address.prefecture.name)
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["city_name"]).to eq(address.city_name)
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["genre_name"]).to eq(Genre.find_by(id: date_spot.genre_id).name)
    end
  end
end
