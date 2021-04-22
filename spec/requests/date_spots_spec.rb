require 'rails_helper'

RSpec.describe "DateSpots", type: :request do
  describe "GET /new" do
    it "管理者権限のユーザーでログインしていない場合、ログイン画面にリダイレクトされること" do
      get new_date_spot_path
      expect(response).to redirect_to login_path
    end

    it "管理者権限のユーザーでログインすると、新規投稿画面に遷移できること"do
      admin = FactoryBot.create(:admin)
      sign_in_request_as admin
      get new_date_spot_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "デートスポット詳細ページに遷移できること" do
      date_spot = FactoryBot.create(:date_spot)
      date_spot.create_address(FactoryBot.attributes_for(:address))
      get date_spot_path date_spot
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /edit" do
    it "管理者権限のユーザーでログインしていない場合、ログイン画面にリダイレクトされること" do
      date_spot = FactoryBot.create(:date_spot)
      date_spot.create_address(FactoryBot.attributes_for(:address))
      get edit_date_spot_path date_spot
      expect(response).to redirect_to login_path
    end

    it "管理者権限のユーザーでログインすると、編集ページに遷移できること"do
      admin = FactoryBot.create(:admin)
      date_spot = FactoryBot.create(:date_spot)
      date_spot.create_address(FactoryBot.attributes_for(:address))
      sign_in_request_as admin
      get edit_date_spot_path date_spot
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /index" do
    it "デートスポット一覧ページに遷移できること" do
      get date_spots_path
      expect(response).to have_http_status(:success)
    end
  end

end
