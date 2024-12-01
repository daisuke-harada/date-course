# == Schema Information
#
# Table name: addresses
#
#  id            :bigint           not null, primary key
#  city_name     :string
#  latitude      :float
#  longitude     :float
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  date_spot_id  :integer
#  prefecture_id :integer
#
# Indexes
#
#  index_addresses_on_date_spot_id_and_created_at   (date_spot_id,created_at)
#  index_addresses_on_prefecture_id_and_created_at  (prefecture_id,created_at)
#
require "rails_helper"

RSpec.describe Address, type: :model do
  describe "#create" do
    let(:address) { build(:address) }
    context "addressを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(address).to be_valid
      end
    end

    context "addressを保存できない場合" do
      it "住所が入力されていない場合、保存できないこと" do
        address.city_name = nil
        address.valid?
        expect(address.errors[:city_name]).to include("を入力してください")
      end

      it "都道府県idが入力されていない場合は、保存できないこと" do
        address.prefecture_id = nil
        address.valid?
        expect(address.errors[:prefecture_id]).to include("を入力してください")
      end
    end
  end
end
