require "rails_helper"

RSpec.describe "Api::V1::Searchs", type: :request do
  describe "POST /date_spot_sort_search" do
    let!(:address) { create(:address) }

    it "エリアが福岡県、ジャンルがショッピングモールのデートスポットを検索する" do
      date_spot = address.date_spot
      post "/api/v1/date_spots/sort", params: {
        "prefecture_id" => "40",
        "genre_id" => 1,
        "come_time" => ""
      }
      expect(JSON.parse(response.body)["status"]).to eq("success")
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["date_spot"]["name"]).to eq(date_spot.name)
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["prefecture_name"]).to eq(address.prefecture.name)
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["city_name"]).to eq(address.city_name)
    end
  end

  describe "POST /date_spot_name_search" do
    let!(:address) { create(:address) }

    it "キャナルシティという名前のデートスポットを全て表示する" do
      date_spot = address.date_spot
      post "/api/v1/date_spot_name_search", params: {
        "date_spot_name" => "キャナルシティ"
      }
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["date_spot"]["name"]).to eq(date_spot.name)
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["prefecture_name"]).to eq(address.prefecture.name)
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["city_name"]).to eq(address.city_name)
    end
  end

  describe "POST /course_sort_search" do
    let!(:during_spot) { create(:during_spot) }
    let!(:another_address) { create(:another_address) }
    let!(:course) { during_spot.course }

    it "福岡県エリアのデートコースを表示する" do
      post "/api/v1/courses/sort", params: {
        "prefecture_id" => "40"
      }
      expect(JSON.parse(response.body)["status"]).to eq("success")
      expect(JSON.parse(response.body)["prefecture_id"]).to eq("40")
      expect(JSON.parse(response.body)["courses"][0]["id"]).to eq(course.id)
    end
  end

  describe "POST /user_name_search" do
    let!(:user) { create(:guest) }

    it "名前がguestのユーザーを検索する" do
      post "/api/v1/user_name_search", params: {
        "user_name" => "guest"
      }
      expect(JSON.parse(response.body)[0]["id"]).to eq(user.id)
      expect(JSON.parse(response.body)[0]["name"]).to eq(user.name)
      expect(JSON.parse(response.body)[0]["email"]).to eq(user.email)
      expect(JSON.parse(response.body)[0]["gender"]).to eq(user.gender)
    end
  end
end
