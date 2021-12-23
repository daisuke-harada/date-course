require 'rails_helper'

RSpec.describe "DateCourses", type: :request do
  describe "GET /new" do
    it "returns http success" do
      get "/date_courses/new"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /edit" do
    it "returns http success" do
      get "/date_courses/edit"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/date_courses/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /index" do
    it "returns http success" do
      get "/date_courses/index"
      expect(response).to have_http_status(:success)
    end
  end

end
