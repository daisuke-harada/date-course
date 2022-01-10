require 'rails_helper'

RSpec.describe Address, type: :model do
  describe "#create" do
    let(:address) { FactoryBot.build(:address) }
    context "addressを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(address).to be_valid
      end
    end

    context "addressを保存できない場合" do
      it "デートスポットが入力されていない場合、保存できないこと" do
        address.date_spot_id = nil
        address.valid?
        expect(address.errors[:date_spot_id]).to include("can't be blank")
      end
    end
  end
end
