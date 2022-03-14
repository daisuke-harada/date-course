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

    it "入力された値が正しくない場合はエラーメッセージがレスポンスで返される" do
      address = FactoryBot.build(:address)
      date_spot = address.date_spot
      post "/api/v1/date_spots", params: {
        "name" => "",
        "prefecture_id" => address.prefecture_id,
        "city_name" => "",
        "genre_id" => "",
        "opening_time" => date_spot.opening_time,
        "closing_time" => date_spot.closing_time,
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq(500)
      expect(JSON.parse(response.body)["error_messages"]["name"]).to eq(["can't be blank"])
      expect(JSON.parse(response.body)["error_messages"]["genre_id"]).to eq(["can't be blank"])
    end
  end

  describe "GET /update" do
    it "入力された値が正しい場合はdate_spotを更新することができる" do
      address = FactoryBot.create(:address)
      date_spot = address.date_spot
      other_address = FactoryBot.build(:other_address)
      other_spot = other_address.date_spot
      put "/api/v1/date_spots/#{date_spot.id}", params: {
        "name" => other_spot.name,
        "prefecture_id" => other_address.prefecture_id,
        "city_name" => other_address.city_name,
        "genre_id" => other_spot.genre_id,
        "opening_time" => other_spot.opening_time,
        "closing_time" => other_spot.closing_time,
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq("updated")
      expect(JSON.parse(response.body)["date_spot"]["name"]).to eq(other_spot.name)
      expect(JSON.parse(response.body)["date_spot"]["genre_id"]).to eq(other_spot.genre_id)
    end

    it "入力された値が正しくない場合はエラーメッセージがレスポンスで返される" do
      address = FactoryBot.create(:address)
      date_spot = address.date_spot
      other_address = FactoryBot.build(:other_address)
      other_spot = other_address.date_spot
      put "/api/v1/date_spots/#{date_spot.id}", params: {
        "name" => '',
        "prefecture_id" => other_address.prefecture_id,
        "city_name" => '',
        "genre_id" => '',
        "opening_time" => other_spot.opening_time,
        "closing_time" => other_spot.closing_time,
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq(500)
      expect(JSON.parse(response.body)["error_messages"]["name"]).to eq(["can't be blank"])
      expect(JSON.parse(response.body)["error_messages"]["genre_id"]).to eq(["can't be blank"])
    end

  end

  describe "GET /destroy" do
    it "date_spot情報の削除に成功する" do
      date_spot = FactoryBot.create(:date_spot)
      delete "/api/v1/date_spots/#{date_spot.id}"
      expect(JSON.parse(response.body)["status"]).to eq("delete")
    end
  end

  describe "GET /show" do
    it "date_spot詳細ページを表示する" do
      FactoryBot.create(:user)
      address = FactoryBot.create(:address)
      date_spot_review = FactoryBot.create(:date_spot_review)
      date_spot = address.date_spot
      get "/api/v1/date_spots/#{date_spot.id}"
      expect(JSON.parse(response.body)["date_spot"]["name"]).to eq(date_spot.name)
      expect(JSON.parse(response.body)["date_spot"]["genre_id"]).to eq(date_spot.genre_id)
      expect(JSON.parse(response.body)["address"]["prefecture_id"]).to eq(address.prefecture_id)
      expect(JSON.parse(response.body)["address"]["city_name"]).to eq(address.city_name)
      expect(JSON.parse(response.body)["genre_name"]).to eq(Genre.find_by(id: date_spot.genre_id).name)
    end
  end

  describe "GET /index" do
    it "date_spot一覧ページを表示する" do
      address = FactoryBot.create(:address)
      date_spot = address.date_spot
      other_address = FactoryBot.create(:other_address)
      other_spot = other_address.date_spot
      get "/api/v1/date_spots"
      expect(JSON.parse(response.body)[0]["date_spot"]["name"]).to eq(date_spot.name)
      expect(JSON.parse(response.body)[0]["prefecture_id"]).to eq(address.prefecture_id)
      expect(JSON.parse(response.body)[0]["city_name"]).to eq(address.city_name)
      expect(JSON.parse(response.body)[1]["date_spot"]["name"]).to eq(other_spot.name)
      expect(JSON.parse(response.body)[1]["prefecture_id"]).to eq(other_address.prefecture_id)
      expect(JSON.parse(response.body)[1]["city_name"]).to eq(other_address.city_name)
    end
  end
end
