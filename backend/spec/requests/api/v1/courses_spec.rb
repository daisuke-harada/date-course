require "rails_helper"

RSpec.describe "Api::V1::Courses", type: :request do
  let(:date_spot) { create(:date_spot) }
  let(:other_spot) { create(:other_spot) }
  let(:user) { create(:user) }
  let(:course) { build(:course) }
  let(:during_spot) { create(:during_spot) }
  let(:other_during_spot) { create(:other_during_spot) }
  let(:course) { create(:course) }
  let(:other_course) { create(:other_course) }

  describe "POST /create" do
    it "入力された値が正しい場合はcourseを登録することができる" do
      post "/api/v1/courses", params: {
        course: {
          user_id: course.user_id,
          travel_mode: course.travel_mode,
          authority: course.authority
        },
        during_spots: [date_spot.id, other_spot.id]
      }
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["status"]).to eq("created")
    end
  end

  describe "DELETE /destroy" do
    it "course情報の削除に成功する" do
      delete "/api/v1/courses/#{during_spot.course_id}"
      expect(JSON.parse(response.body)["status"]).to eq("deleted")
    end
  end

  describe "GET /show" do
    it "course詳細ページの表示に成功する" do
      get "/api/v1/courses/#{course.id}"
      expect(JSON.parse(response.body)["authority"]).to eq(course.authority)
      expect(JSON.parse(response.body)["travel_mode"]).to eq(course.travel_mode)
      expect(JSON.parse(response.body)["date_spots"]).to eq([])
    end
  end

  describe "GET /index" do
    it "course一覧ページの表示に成功する" do
      # ここで呼び出さなければcourseとother_courseが保存されなくなる
      course
      other_course

      get "/api/v1/courses"
      expect(JSON.parse(response.body)[0]["authority"]).to eq(course.authority)
      expect(JSON.parse(response.body)[0]["travel_mode"]).to eq(course.travel_mode)
      expect(JSON.parse(response.body)[1]["authority"]).to eq(other_course.authority)
      expect(JSON.parse(response.body)[1]["travel_mode"]).to eq(other_course.travel_mode)
    end
  end
end
