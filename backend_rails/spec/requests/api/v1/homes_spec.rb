require "rails_helper"

RSpec.describe "Api::V1::Homes", type: :request do
  describe "GET /top" do
    let!(:date_spot) { create(:address).date_spot }
    let!(:other_spot) { create(:other_address).date_spot }

    it "topページを表示する" do
      get "/api/v1/top"
      areas = Area.all.map do |area|
        {
          "attributes" => {
            "id" => area.id,
            "name" => area.name
          }
        }
      end

      main_prefectures = Prefecture.where(id: [13, 27, 40, 14, 23, 26]).map do |prefecture|
        {
          "attributes" => {
            "id" => prefecture.id,
            "name" => prefecture.name,
            "area_id" => prefecture.area_id
          }
        }
      end

      main_genres = Genre.where(id: [1, 2, 3, 4, 5, 6]).map do |genre|
        {
          "attributes" => {
            "id" => genre.id,
            "name" => genre.name
          }
        }
      end

      genres = Genre.all.map do |genre|
        {
          "attributes" => {
            "id" => genre.id,
            "name" => genre.name
          }
        }
      end

      expect(JSON.parse(response.body)["areas"]).to eq(areas)
      expect(JSON.parse(response.body)["main_prefectures"]).to eq(main_prefectures)
      expect(JSON.parse(response.body)["main_genres"]).to eq(main_genres)
      expect(JSON.parse(response.body)["genres"]).to eq(genres)
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["date_spot"]["name"]).to eq(date_spot.name)
      expect(JSON.parse(response.body)["address_and_date_spots"][1]["date_spot"]["name"]).to eq(other_spot.name)
    end
  end
end
