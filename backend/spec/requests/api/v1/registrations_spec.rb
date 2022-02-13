require 'rails_helper'

RSpec.describe "Api::V1::Registrations", type: :request do
  describe "GET /sign_up" do
    it "returns http success" do
      get "/api/v1/registrations/sign_up"
      expect(response).to have_http_status(:success)
    end
  end

end
