require 'rails_helper'

RSpec.describe "Api::V1::DateSpots", type: :request do
  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/date_spots/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/api/v1/date_spots/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/date_spots/destroy"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/api/v1/date_spots/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/date_spots/index"
      expect(response).to have_http_status(:success)
    end
  end

end
