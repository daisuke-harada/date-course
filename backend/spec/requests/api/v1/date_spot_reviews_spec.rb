require "rails_helper"

RSpec.describe "Api::V1::DateSpotReviews", type: :request do
  describe "POST /create" do
    let!(:user) { create(:user) }
    let!(:date_spot) { create(:date_spot) }
    let(:date_spot_review) { build(:date_spot_review) }

    it "入力された値が正しい場合はdate_spo_reviewを登録することができる" do
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
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["user_name"]).to eq(date_spot_review.user.name)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["user_gender"]).to eq(date_spot_review.user.gender)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["user_id"]).to eq(date_spot_review.user_id)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["date_spot_id"]).to eq(date_spot_review.date_spot_id)
    end

    it "入力された値が正しくない場合はエラーメッセージがレスポンスで返される" do
      date_spot_review = build(:date_spot_review)
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
      expect(JSON.parse(response.body)["error_messages"]["user_id"]).to eq(["を入力してください"])
      expect(JSON.parse(response.body)["error_messages"]["date_spot_id"]).to eq(["を入力してください"])
    end
  end

  describe "PUT /update" do
    let!(:date_spot_review) { create(:date_spot_review) }

    it "入力された値が正しい場合はdate_spot_reviewsを更新することができる" do
      put "/api/v1/date_spot_reviews/#{date_spot_review.id}", params: {
        date_spot_review: {
          rate: 5.0,
          content: "編集しました",
          user_id: date_spot_review.user_id,
          date_spot_id: date_spot_review.date_spot_id
        }
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq("updated")
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["rate"]).to eq(5.0)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["content"]).to eq("編集しました")
      expect(JSON.parse(response.body)["review_average_rate"]).to eq(5.0)
    end

    it "入力された値が正しくない場合はエラーメッセージがレスポンスで返される" do
      put "/api/v1/date_spot_reviews/#{date_spot_review.id}", params: {
        date_spot_review: {
          rate: 5.0,
          content: "a" * 101,
          user_id: date_spot_review.user_id,
          date_spot_id: date_spot_review.date_spot_id
        }
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq(500)
      expect(JSON.parse(response.body)["error_messages"]["content"]).to eq(["は75文字以内で入力してください"])
    end
  end

  describe "DELETE /destroy" do
    let!(:date_spot_review) { create(:date_spot_review) }
    let!(:other_date_spot_review) { create(:other_date_spot_review) }

    it "date_spot情報の削除に成功する" do
      delete "/api/v1/date_spot_reviews/#{date_spot_review.id}"
      expect(JSON.parse(response.body)["status"]).to eq("deleted")
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["rate"]).to eq(date_spot_review.rate)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["content"]).to eq(date_spot_review.content)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["user_name"]).to eq(date_spot_review.user.name)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["user_gender"]).to eq(date_spot_review.user.gender)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["user_id"]).to eq(date_spot_review.user_id)
      expect(JSON.parse(response.body)["date_spot_reviews"][0]["date_spot_id"]).to eq(date_spot_review.date_spot_id)
      expect(JSON.parse(response.body)["review_average_rate"]).to eq(1.0)
    end
  end
end
