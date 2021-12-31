require 'rails_helper'

RSpec.describe InformationCourse, type: :model do
  let(:information_course) { FactoryBot.build(:information_course) }
  context "information_courseを保存できる場合" do
    it "正常値の場合、保存できること" do
      expect(information_course).to be_valid
    end
  end
end
