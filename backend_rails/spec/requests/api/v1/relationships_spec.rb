require "rails_helper"

RSpec.describe "Api::V1::Relationships", type: :request do
  let!(:user) { create(:user) }
  let!(:other_user) { create(:other_user) }

  describe "POST /create" do
    it "ユーザーをフォローする" do
      post "/api/v1/relationships", params: {
        "current_user_id" => user.id,
        "followed_user_id" => other_user.id
      }
      expect(response.status).to eq(201)
      expect(JSON.parse(response.body)["current_user"]["id"]).to eq(user.id)
      expect(JSON.parse(response.body)["followed_user"]["id"]).to eq(other_user.id)
    end
  end

  describe "DELETE /destroy" do
    let!(:relationship) { create(:relationship) }

    it "ユーザーをアンフォローする" do
      delete "/api/v1/relationships/#{user.id}/#{other_user.id}"
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["current_user"]["id"]).to eq(user.id)
      expect(JSON.parse(response.body)["unfollowed_user"]["id"]).to eq(other_user.id)
    end
  end

  describe "GET /followings" do
    let!(:relationship) { create(:relationship) }

    it "ユーザーのフォローしているユーザーをレスポンスで返す" do
      get "/api/v1/users/#{user.id}/followings"
      expect(JSON.parse(response.body)["user_name"]).to eq(user.name)
      expect(JSON.parse(response.body)["users"][0]["id"]).to eq(other_user.id)
      expect(JSON.parse(response.body)["users"][0]["name"]).to eq(other_user.name)
      expect(JSON.parse(response.body)["users"][0]["email"]).to eq(other_user.email)
      expect(JSON.parse(response.body)["users"][0]["gender"]).to eq(other_user.gender)
      expect(JSON.parse(response.body)["users"][0]["admin"]).to eq(other_user.admin)
    end
  end

  describe "GET /followers" do
    let!(:relationship) { create(:relationship) }

    it "ユーザーがフォローされているユーザーをレスポンスで返す" do
      get "/api/v1/users/#{other_user.id}/followers"
      expect(JSON.parse(response.body)["user_name"]).to eq(other_user.name)
      expect(JSON.parse(response.body)["users"][0]["id"]).to eq(user.id)
      expect(JSON.parse(response.body)["users"][0]["name"]).to eq(user.name)
      expect(JSON.parse(response.body)["users"][0]["email"]).to eq(user.email)
      expect(JSON.parse(response.body)["users"][0]["gender"]).to eq(user.gender)
      expect(JSON.parse(response.body)["users"][0]["admin"]).to eq(user.admin)
    end
  end
end
