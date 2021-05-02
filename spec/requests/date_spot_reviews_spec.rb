require 'rails_helper'

RSpec.describe "DateSpotReviews", type: :request do
  describe "GET /edit" do
    it "ログインしていない場合、ログイン画面にリダイレクトされること" do
      date_spot_review = FactoryBot.create(:date_spot_review)
      get edit_date_spot_review_path(date_spot_review)
      expect(response).to redirect_to login_path
    end

    it "投稿したユーザーではない場合、ログイン画面にリダイレクトされること" do
      date_spot_review = FactoryBot.create(:date_spot_review)
      other_user = FactoryBot.create(:other_user)
      sign_in_request_as other_user
      get edit_date_spot_review_path(date_spot_review)
      expect(response).to redirect_to root_path
    end

    it "投稿したユーザーの場合、編集ページにアクセスできること" do
      date_spot_review = FactoryBot.create(:date_spot_review)
      sign_in_request_as date_spot_review.user
      get edit_date_spot_review_path(date_spot_review)
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /new" do
    it "ログインしていない場合、ログイン画面にリダイレクトされること" do
      date_spot = FactoryBot.create(:date_spot)
      get new_date_spot_date_spot_review_path(date_spot)
      expect(response).to redirect_to login_path
    end

    it "新規投稿ページにアクセスできること" do
      date_spot = FactoryBot.create(:date_spot)
      user = FactoryBot.create(:user)
      sign_in_request_as user
      get new_date_spot_date_spot_review_path(date_spot)
      expect(response).to have_http_status(:success)
    end
  end
end
