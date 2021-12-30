require 'rails_helper'

RSpec.describe "CreateCourses", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/create_courses/index"
      expect(response).to have_http_status(:success)
    end
  end

end
