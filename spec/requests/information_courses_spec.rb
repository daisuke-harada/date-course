require 'rails_helper'

RSpec.describe "InformationCourses", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/information_courses/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/information_courses/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /edit" do
    it "returns http success" do
      get "/information_courses/edit"
      expect(response).to have_http_status(:success)
    end
  end

end
