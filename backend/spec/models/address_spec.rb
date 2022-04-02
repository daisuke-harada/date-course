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
      it "住所が入力されていない場合、保存できないこと" do
        address.city_name = nil
        address.valid?
        expect(address.errors[:city_name]).to include("can't be blank")
      end

      it "都道府県idが入力されていない場合は、保存できないこと" do
        address.prefecture_id = nil
        address.valid?
        expect(address.errors[:prefecture_id]).to include("can't be blank")
      end
    end
  end

end
