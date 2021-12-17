require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "GET /show" do
    it "マイページ、ユーザー詳細ページに遷移できること" do
      user = FactoryBot.create(:user)
      get user_path(user.id)
      expect(response).to have_http_status(:success)
    end

    it "admin属性をWeb経由で編集できないこと" do
      user = FactoryBot.create(:user)
      sign_in_request_as user
      expect(user.admin).to eq false
      admin_change_params = { user: { name: user.name, email: user.email, sex: user.sex, password: user.password, password_confirmation: user.password_confirmation, admin: true } }
      patch user_path(user), params: admin_change_params
      expect(user.reload.admin).to eq false
    end
  end

  describe "GET /new" do
    it "新規登録画面に遷移できること" do
      get new_user_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /edit" do
    it "ログインしたユーザーが自身のユーザー編集ページに遷移できること" do
      user = FactoryBot.create(:user)
      sign_in_request_as user
      get edit_user_path(user.id)
      expect(response).to have_http_status(:success)
    end

    it "ログインしていないユーザーはユーザー編集ページに遷移できないこと" do
      user = FactoryBot.create(:user)
      get edit_user_path(user.id)
      expect(response).to have_http_status(302)
    end
  end

  describe "GET /index" do
    it "ユーザー一覧ページに遷移できること" do
      user = FactoryBot.create(:user)
      other_user = FactoryBot.create(:other_user)
      guest = FactoryBot.create(:guest)
      get users_path
      expect(response).to have_http_status(:success)
    end
  end
end
