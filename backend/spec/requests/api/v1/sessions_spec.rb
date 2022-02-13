require 'rails_helper'

RSpec.describe "Api::V1::Sessions", type: :request do
  describe "GET /login" do
    it "returns http success" do
      get "/api/v1/sessions/login"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /logout" do
    it "returns http success" do
      get "/api/v1/sessions/logout"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /logged_in" do
    it "returns http success" do
      get "/api/v1/sessions/logged_in"
      expect(response).to have_http_status(:success)
    end
  end

end
