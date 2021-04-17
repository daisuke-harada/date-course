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
      it "都道府県が選択されてなければ保存できないこと" do
        address.prefecture_id = nil
        address.valid?
        expect(address.errors[:prefecture_id]).to include("can't be blank")
      end

      it "市の名前が入力されてなければ保存できないこと" do
        address.city_name = nil
        address.valid?
        expect(address.errors[:city_name]).to include("can't be blank")
      end

      it "date_spot_idがnilならば保存できないこと" do
        address.date_spot_id = nil
        address.valid?
        expect(address.errors[:date_spot_id]).to include("can't be blank")
      end
    end
  end
end
