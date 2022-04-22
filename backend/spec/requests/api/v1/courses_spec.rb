require 'rails_helper'

RSpec.describe "Api::V1::Courses", type: :request do
  describe "POST /create" do
    it "入力された値が正しい場合はcourseを登録することができる" do
      date_spot = FactoryBot.create(:date_spot)
      other_spot = FactoryBot.create(:other_spot)
      FactoryBot.create(:user)
      course = FactoryBot.build(:course)
      post "/api/v1/courses", params: {
        course: {
          user_id: course.user_id,
          travel_mode: course.travel_mode,
          authority: course.authority,
        },
        during_spots: [date_spot.id, other_spot.id],
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq("created")
    end
  end

  describe "DELETE /destroy" do
    it "course情報の削除に成功する" do
      during_spot = FactoryBot.create(:during_spot)
      FactoryBot.create(:other_during_spot)
      delete "/api/v1/courses/#{during_spot.course_id}"
      expect(JSON.parse(response.body)["status"]).to eq("deleted")
    end
  end

  describe "GET /show" do
    it "course詳細ページの表示に成功する" do
      course = FactoryBot.create(:course)
      get "/api/v1/courses/#{course.id}"
      expect(JSON.parse(response.body)["course"]["authority"]).to eq(course.authority)
      expect(JSON.parse(response.body)["course"]["travel_mode"]).to eq(course.travel_mode)
      expect(JSON.parse(response.body)["course"]["course_during_spots"]).to eq([])
    end
  end

  describe "GET /index" do
    it "course一覧ページの表示に成功する" do
      course = FactoryBot.create(:course)
      other_course = FactoryBot.create(:other_course)
      get "/api/v1/courses"
      expect(JSON.parse(response.body)["courses"][0]["authority"]).to eq(course.authority)
      expect(JSON.parse(response.body)["courses"][0]["travel_mode"]).to eq(course.travel_mode)
      expect(JSON.parse(response.body)["courses"][1]["authority"]).to eq(other_course.authority)
      expect(JSON.parse(response.body)["courses"][1]["travel_mode"]).to eq(other_course.travel_mode)
    end
  end
end
