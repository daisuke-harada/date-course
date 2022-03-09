require 'rails_helper'

RSpec.describe "Api::V1::DateSpots", type: :request do
  describe "GET /create" do
    it "入力された値が正しい場合はdate_spotを登録することができる" do
      address = FactoryBot.build(:address)
      post "/api/v1/date_spots", params: {"name" => address.date_spot.name, "prefecture_id" => address.date_spot.prefecture_id,  }
      expect(response.status).to eq(200)
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
