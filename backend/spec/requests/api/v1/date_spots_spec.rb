require "rails_helper"

RSpec.describe "Api::V1::DateSpots", type: :request do
  describe "POST /create" do
    let(:address) { build(:address) }
    let(:date_spot) { address.date_spot }

    it "入力された値が正しい場合はdate_spotを登録することができる" do
      post "/api/v1/date_spots", params: {
        "name" => date_spot.name,
        "prefecture_id" => address.prefecture_id,
        "city_name" => address.city_name,
        "genre_id" => date_spot.genre_id,
        "opening_time" => date_spot.opening_time,
        "closing_time" => date_spot.closing_time
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq("created")
      expect(JSON.parse(response.body)["date_spot"]["name"]).to eq(date_spot.name)
      expect(JSON.parse(response.body)["date_spot"]["genre_id"]).to eq(date_spot.genre_id)
    end

    it "入力された値が正しくない場合はエラーメッセージがレスポンスで返される" do
      post "/api/v1/date_spots", params: {
        "name" => "",
        "prefecture_id" => address.prefecture_id,
        "city_name" => "",
        "genre_id" => "",
        "opening_time" => date_spot.opening_time,
        "closing_time" => date_spot.closing_time
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq(500)
      expect(JSON.parse(response.body)["error_messages"]["name"]).to eq(["を入力してください"])
      expect(JSON.parse(response.body)["error_messages"]["genre_id"]).to eq(["を入力してください"])
    end
  end

  describe "PUT /update" do
    let(:address) { create(:address) }
    let(:date_spot) { address.date_spot }
    let(:other_address) { build(:other_address) }
    let(:other_spot) { other_address.date_spot }
    it "入力された値が正しい場合はdate_spotを更新することができる" do
      put "/api/v1/date_spots/#{date_spot.id}", params: {
        "name" => other_spot.name,
        "prefecture_id" => other_address.prefecture_id,
        "city_name" => other_address.city_name,
        "genre_id" => other_spot.genre_id,
        "opening_time" => other_spot.opening_time,
        "closing_time" => other_spot.closing_time
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq("updated")
      expect(JSON.parse(response.body)["date_spot"]["name"]).to eq(other_spot.name)
      expect(JSON.parse(response.body)["date_spot"]["genre_id"]).to eq(other_spot.genre_id)
    end

    it "入力された値が正しくない場合はエラーメッセージがレスポンスで返される" do
      put "/api/v1/date_spots/#{date_spot.id}", params: {
        "name" => "",
        "prefecture_id" => other_address.prefecture_id,
        "city_name" => "",
        "genre_id" => "",
        "opening_time" => other_spot.opening_time,
        "closing_time" => other_spot.closing_time
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq(500)
      expect(JSON.parse(response.body)["error_messages"]["name"]).to eq(["を入力してください"])
      expect(JSON.parse(response.body)["error_messages"]["genre_id"]).to eq(["を入力してください"])
    end
  end

  describe "DELETE /destroy" do
    let(:date_spot) { create(:date_spot) }
    it "date_spot情報の削除に成功する" do
      delete "/api/v1/date_spots/#{date_spot.id}"
      expect(JSON.parse(response.body)["status"]).to eq("deleted")
    end
  end

  describe "GET /show" do
    let!(:address) { create(:address) }
    let!(:date_spot_review) { create(:other_date_spot_review) }
    let(:date_spot) { address.date_spot }
    it "date_spot詳細ページを表示する" do
      get "/api/v1/date_spots/#{date_spot.id}"
      expect(JSON.parse(response.body)["address_and_date_spot"]["date_spot"]["name"]).to eq(date_spot.name)
      expect(JSON.parse(response.body)["address_and_date_spot"]["date_spot"]["genre_id"]).to eq(date_spot.genre_id)
      expect(JSON.parse(response.body)["address_and_date_spot"]["prefecture_name"]).to eq(address.prefecture.name)
      expect(JSON.parse(response.body)["address_and_date_spot"]["city_name"]).to eq(address.city_name)
      expect(JSON.parse(response.body)["address_and_date_spot"]["genre_name"]).to eq(Genre.find_by(id: date_spot.genre_id).name)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["content"]).to eq(date_spot_review.content)
      expect(JSON.parse(response.body)["review_average_rate"]).to eq(1)
    end
  end

  describe "GET /index" do
    let!(:address) { create(:address) }
    let(:date_spot) { address.date_spot }
    let!(:other_address) { create(:other_address) }
    let(:other_spot) { other_address.date_spot }

    it "date_spot一覧ページを表示する" do
      get "/api/v1/date_spots"
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["date_spot"]["name"]).to eq(date_spot.name)
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["prefecture_name"]).to eq(address.prefecture.name)
      expect(JSON.parse(response.body)["address_and_date_spots"][0]["city_name"]).to eq(address.city_name)
      expect(JSON.parse(response.body)["address_and_date_spots"][1]["date_spot"]["name"]).to eq(other_spot.name)
      expect(JSON.parse(response.body)["address_and_date_spots"][1]["prefecture_name"]).to eq(other_address.prefecture.name)
      expect(JSON.parse(response.body)["address_and_date_spots"][1]["city_name"]).to eq(other_address.city_name)
    end
  end
end
