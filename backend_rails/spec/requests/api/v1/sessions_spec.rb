require "rails_helper"

RSpec.describe "Api::V1::Sessions", type: :request do
  describe "POST /login" do
    let!(:user) { create(:user) }

    it "ユーザーのログインに成功する" do
      post "/api/v1/login", params: {sign_in_params: {name: user.name, password: user.password}}
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["id"]).to eq(user.id)
      expect(JSON.parse(response.body)["name"]).to eq(user.name)
      expect(JSON.parse(response.body)["email"]).to eq(user.email)
      expect(JSON.parse(response.body)["gender"]).to eq(user.gender)
      expect(JSON.parse(response.body)["admin"]).to eq(user.admin)
    end

    it "ユーザーのログインに失敗する" do
      post "/api/v1/login", params: {sign_in_params: {name: "daisuke", password: user.password}}
      expect(response.status).to eq(401)
      expect(JSON.parse(response.body)["error_messages"]).to eq(["認証に失敗しました。", "正しい名前・パスワードを入力し直すか、新規登録を行ってください。"])
    end
  end
end
