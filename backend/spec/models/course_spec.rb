require 'rails_helper'

RSpec.describe Course, type: :model do
  describe "#create" do
    let(:course) { FactoryBot.build(:course) }
    context "courseを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(course).to be_valid
      end
    end

    context "courseを保存できない場合" do
      it "交通手段が入力されていない場合、保存できないこと" do
        course.travel_mode = nil
        course.valid?
        expect(course.errors[:travel_mode]).to include("can't be blank")
      end

      it "公開ステータスが入力されていない場合は、保存できないこと" do
        course.authority = nil
        course.valid?
        expect(course.errors[:authority]).to include("can't be blank")
      end

      it "use_idが入力されていない場合は、保存できないこと" do
        course.user_id = nil
        course.valid?
        expect(course.errors[:user_id]).to include("can't be blank")
      end
    end
  end
end
