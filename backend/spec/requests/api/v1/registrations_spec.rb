require 'rails_helper'

RSpec.describe "Api::V1::Registrations", type: :request do
  describe "POST /signup" do
    it "入力された値が正しい場合はuserを登録することができる" do
      user = FactoryBot.build(:user)
      post "/api/v1/signup", params: {
        "name" => user.name, "email" =>  user.email,
        "gender" => user.gender, "password" => user.password,
        "password_confirmation" => user.password_confirmation
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq("created")
      expect(JSON.parse(response.body)["login_status"]).to eq(true)
      expect(JSON.parse(response.body)["user"]["name"]).to eq(user.name)
      expect(JSON.parse(response.body)["user"]["email"]).to eq(user.email)
      expect(JSON.parse(response.body)["user"]["gender"]).to eq(user.gender)
      expect(JSON.parse(response.body)["user"]["admin"]).to eq(user.admin)
      expect(JSON.parse(response.body)["user"]["password_digest"])
      expect(JSON.parse(response.body)["user"]["created_at"])
      expect(JSON.parse(response.body)["user"]["updated_at"])
    end

    it "入力された値が正しくない場合はuserを登録することができず、エラーメッセージが設定される" do
      post "/api/v1/signup", params: {"name" => "", "email" =>  "", "gender" => "", "password" => "", "password_confirmation" => ""}
      expect(JSON.parse(response.body)["status"]).to eq(500)
      expect(JSON.parse(response.body)["error_messages"]["name"]).to eq(["を入力してください"])
      expect(JSON.parse(response.body)["error_messages"]["email"]).to eq(["を入力してください", "は不正な値です"])
      expect(JSON.parse(response.body)["error_messages"]["gender"]).to eq(["を入力してください"])
      expect(JSON.parse(response.body)["error_messages"]["password"]).to eq(["を入力してください"])
      expect(JSON.parse(response.body)["error_messages"]["password_confirmation"]).to eq(nil)
    end
  end

end
