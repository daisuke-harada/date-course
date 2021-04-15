require 'rails_helper'

RSpec.describe "DateSpots", type: :request do
  describe "GET /new" do
    it "returns http success" do
      get "/date_spots/new"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/date_spots/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /edit" do
    it "returns http success" do
      get "/date_spots/edit"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /index" do
    it "returns http success" do
      get "/date_spots/index"
      expect(response).to have_http_status(:success)
    end
  end

end
