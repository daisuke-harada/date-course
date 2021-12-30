require 'rails_helper'

RSpec.describe ManagementCourse, type: :model do
  describe "#create" do
    let(:management_course) { FactoryBot.build(:management_course) }
    context "management_courseを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(management_course).to be_valid
      end
    end
  end
end
