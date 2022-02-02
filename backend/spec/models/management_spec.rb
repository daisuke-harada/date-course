require 'rails_helper'

RSpec.describe Management, type: :model do
  describe "#create" do
    let(:management) { FactoryBot.build(:management) }
    context "managementを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(management).to be_valid
      end
    end

    context "managementを保存できない場合" do
      it "traffic_modeが空の場合は、保存できないこと" do
        management.traffic_mode = nil
        management.valid?
        expect(management.errors[:traffic_mode]).to include("can't be blank")
      end
    end
  end
end
