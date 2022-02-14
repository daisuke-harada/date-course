require 'rails_helper'

RSpec.describe "Api::V1::Registrations", type: :request do
  describe "GET /signup" do
    it "returns http success" do
      get "/api/v1/registrations/signup"
      expect(response).to have_http_status(:success)
    end
  end

end
