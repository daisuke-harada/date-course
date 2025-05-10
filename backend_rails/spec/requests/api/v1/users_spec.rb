require "rails_helper"

RSpec.describe "Api::V1::Users", type: :request do
  let!(:user) { create(:user) }
  let!(:other_user) { create(:other_user) }

  describe "GET /index" do
    it "user一覧ページを表示する" do
      get "/api/v1/users"
      expect(JSON.parse(response.body)[0]["name"]).to eq(user.name)
      expect(JSON.parse(response.body)[1]["name"]).to eq(other_user.name)
    end
  end

  describe "GET /show" do
    it "user詳細ページを表示する" do
      get "/api/v1/users/#{user.id}"
      expect(JSON.parse(response.body)["name"]).to eq(user.name)
      expect(JSON.parse(response.body)["email"]).to eq(user.email)
      expect(JSON.parse(response.body)["created_at"])
      expect(JSON.parse(response.body)["updated_at"])
    end
  end

  describe "PUT /update" do
    it "user情報の編集に成功する" do
      put "/api/v1/users/#{user.id}", params: {
        "name" => "edit",
        "email" => "edit@gmail.com",
        "gender" => "女性",
        "password" => "edit_password",
        "password_confirmation" => "edit_password"
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["name"]).to eq("edit")
      expect(JSON.parse(response.body)["email"]).to eq("edit@gmail.com")
      expect(JSON.parse(response.body)["gender"]).to eq("女性")
    end

    it "user情報の編集に失敗する" do
      put "/api/v1/users/#{user.id}", params: {
        "name" => "",
        "email" => "",
        "gender" => "",
        "password" => "",
        "password_confirmation" => ""
      }
      expect(response.status).to eq(422)
      expect(JSON.parse(response.body)["error_messages"]["name"]).to eq(["を入力してください"])
      expect(JSON.parse(response.body)["error_messages"]["email"]).to eq(["を入力してください", "は不正な値です"])
      expect(JSON.parse(response.body)["error_messages"]["gender"]).to eq(["を入力してください"])
      expect(JSON.parse(response.body)["error_messages"]["password"]).to eq(nil)
      expect(JSON.parse(response.body)["error_messages"]["password_confirmation"]).to eq(nil)
    end
  end

  describe "DELETE /destroy" do
    it "user情報の削除に成功する" do
      delete "/api/v1/users/#{user.id}"
      expect(response.status).to eq(204)
    end
  end
end
