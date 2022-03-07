require 'rails_helper'

RSpec.describe "Api::V1::Prefectures", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/prefectures/index"
      expect(response).to have_http_status(:success)
    end
  end

end
