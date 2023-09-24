require "rails_helper"

RSpec.describe "Api::V1::Relationships", type: :request do
  describe "POST /create" do
    it "ユーザーをフォローする" do
      user = FactoryBot.create(:user)
      other_user = FactoryBot.create(:other_user)
      post "/api/v1/relationships", params: {
        "current_user_id" => user.id,
        "followed_user_id" => other_user.id
      }
      expect(JSON.parse(response.body)["status"]).to eq("created")
      expect(JSON.parse(response.body)["current_user"]["id"]).to eq(user.id)
      expect(JSON.parse(response.body)["followed_user"]["id"]).to eq(other_user.id)
    end
  end

  describe "DELETE /destroy" do
    it "ユーザーをアンフォローする" do
      user = FactoryBot.create(:user)
      other_user = FactoryBot.create(:other_user)
      FactoryBot.create(:relationship)
      delete "/api/v1/relationships/#{user.id}/#{other_user.id}"
      expect(JSON.parse(response.body)["status"]).to eq("deleted")
      expect(JSON.parse(response.body)["current_user"]["id"]).to eq(user.id)
      expect(JSON.parse(response.body)["unfollowed_user"]["id"]).to eq(other_user.id)
    end
  end

  describe "GET /followings" do
    it "ユーザーのフォローしているユーザーをレスポンスで返す" do
      user = FactoryBot.create(:user)
      other_user = FactoryBot.create(:other_user)
      FactoryBot.create(:relationship)
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
    it "ユーザーがフォローされているユーザーをレスポンスで返す" do
      user = FactoryBot.create(:user)
      other_user = FactoryBot.create(:other_user)
      FactoryBot.create(:relationship)
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
