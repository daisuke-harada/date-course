require 'rails_helper'

RSpec.describe "Api::V1::Sessions", type: :request do
  describe "POST /login" do
    it "ユーザーのログインに成功する" do
      user = FactoryBot.create(:user)
      post "/api/v1/login", params: { sign_in_params: { name: user.name, password: user.password}}
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["login_status"]).to eq(true)
      expect(JSON.parse(response.body)["user"]["name"]).to eq(user.name)
      expect(JSON.parse(response.body)["user"]["email"]).to eq(user.email)
      expect(JSON.parse(response.body)["user"]["gender"]).to eq(user.gender)
      expect(JSON.parse(response.body)["user"]["admin"]).to eq(user.admin)
      expect(JSON.parse(response.body)["user"]["password_digest"])
      expect(JSON.parse(response.body)["user"]["created_at"])
      expect(JSON.parse(response.body)["user"]["updated_at"])
    end

    it "ユーザーのログインに失敗する" do
      user = FactoryBot.create(:user)
      post "/api/v1/login", params: { sign_in_params: { name: "daisuke", password: user.password}}
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["login_status"]).to eq(false)
      expect(JSON.parse(response.body)["status"]).to eq(401)
      expect(JSON.parse(response.body)["errors"]).to eq(['認証に失敗しました。', '正しい名前・パスワードを入力し直すか、新規登録を行ってください。'])
    end
  end
end
