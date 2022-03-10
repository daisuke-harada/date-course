require 'rails_helper'

RSpec.describe "Api::V1::DateSpots", type: :request do
  describe "GET /create" do
    it "入力された値が正しい場合はdate_spotを登録することができる" do
      address = FactoryBot.build(:address)
      date_spot = address.date_spot
      post "/api/v1/date_spots", params: {
        "name" => date_spot.name,
        "prefecture_id" => address.prefecture_id,
        "city_name" => address.city_name,
        "genre_id" => date_spot.genre_id,
        "opening_time" => date_spot.opening_time,
        "closing_time" => date_spot.closing_time,
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq("created")
      expect(JSON.parse(response.body)["date_spot"]["name"]).to eq(date_spot.name)
      expect(JSON.parse(response.body)["date_spot"]["genre_id"]).to eq(date_spot.genre_id)
    end
  end

  describe "GET /update" do
    it "returns http success" do
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
    end
  end

  describe "GET /show" do
    it "returns http success" do
    end
  end

  describe "GET /index" do
    it "returns http success" do
    end
  end

end
