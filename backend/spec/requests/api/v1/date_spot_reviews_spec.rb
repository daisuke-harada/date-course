require 'rails_helper'

RSpec.describe "Api::V1::DateSpotReviews", type: :request do
  describe "POST /create" do
    it "入力された値が正しい場合はdate_spo_reviewを登録することができる" do
      FactoryBot.create(:date_spot)
      user = FactoryBot.create(:user)
      date_spot_review = FactoryBot.build(:date_spot_review)
      post "/api/v1/date_spot_reviews", params: {
        date_spot_review: {
          rate: date_spot_review.rate,
          content: date_spot_review.content,
          user_id: date_spot_review.user_id,
          date_spot_id: date_spot_review.date_spot_id
        }
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq("created")
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["rate"]).to eq(date_spot_review.rate)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["content"]).to eq(date_spot_review.content)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["user_name"]).to eq(user.name)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["user_gender"]).to eq(user.gender)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["user_id"]).to eq(date_spot_review.user_id)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["date_spot_id"]).to eq(date_spot_review.date_spot_id)
    end

    it "入力された値が正しくない場合はエラーメッセージがレスポンスで返される" do
      FactoryBot.create(:date_spot)
      user = FactoryBot.create(:user)
      date_spot_review = FactoryBot.build(:date_spot_review)
      post "/api/v1/date_spot_reviews", params: {
        date_spot_review: {
          rate: date_spot_review.rate,
          content: date_spot_review.content,
          user_id: "",
          date_spot_id: ""
        }
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq(500)
      expect(JSON.parse(response.body)["error_messages"]["user_id"]).to eq(["can't be blank"])
      expect(JSON.parse(response.body)["error_messages"]["date_spot_id"]).to eq(["can't be blank"])
    end
  end

  describe "DELETE /destroy" do
    it "date_spot情報の削除に成功する" do
      FactoryBot.create(:date_spot)
      FactoryBot.create(:user)
      other_user = FactoryBot.create(:other_user)
      other_date_spot_review = FactoryBot.create(:other_date_spot_review)
      date_spot_review = FactoryBot.create(:date_spot_review)
      delete "/api/v1/date_spot_reviews/#{date_spot_review.id}"
      expect(JSON.parse(response.body)["status"]).to eq("deleted")
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["rate"]).to eq(other_date_spot_review.rate)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["content"]).to eq(other_date_spot_review.content)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["user_name"]).to eq(other_user.name)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["user_gender"]).to eq(other_user.gender)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["user_id"]).to eq(other_date_spot_review.user_id)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["date_spot_id"]).to eq(other_date_spot_review.date_spot_id)
    end
  end
end