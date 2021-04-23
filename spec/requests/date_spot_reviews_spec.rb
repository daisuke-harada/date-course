require 'rails_helper'

RSpec.describe "DateSpotReviews", type: :request do
  describe "GET /edit" do
    it "returns http success" do
      get "/date_spot_reviews/edit"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /new" do
    it "returns http success" do
      get "/date_spot_reviews/new"
      expect(response).to have_http_status(:success)
    end
  end

end
