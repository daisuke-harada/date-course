require 'rails_helper'

RSpec.describe "Api::V1::Homes", type: :request do
  describe "GET /top" do
    it "returns http success" do
      get "/api/v1/homes/top"
      expect(response).to have_http_status(:success)
    end
  end

end
