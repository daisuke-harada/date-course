require "rails_helper"

RSpec.describe DuringSpot, type: :model do
  describe "#create" do
    let(:during_spot) { FactoryBot.build(:during_spot) }

    context "during_spotを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(during_spot).to be_valid
      end
    end

    context "during_spotを保存できない場合" do
      it "デートスポットidが入力されていなければ保存できないこと" do
        during_spot.date_spot_id = nil
        during_spot.valid?
        expect(during_spot.errors[:date_spot_id]).to include("を入力してください")
      end

      it "コースidが入力されていなければ保存できないこと" do
        during_spot.course_id = nil
        during_spot.valid?
        expect(during_spot.errors[:course_id]).to include("を入力してください")
      end
    end
  end
end
