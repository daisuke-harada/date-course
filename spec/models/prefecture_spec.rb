require 'rails_helper'

RSpec.describe Prefecture, type: :model do
  describe "#create" do
    let(:prefecture) { FactoryBot.build(:prefecture)}
    context "prefectureを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(prefecture).to be_valid
      end
    end

    context "prefectureを保存でない場合" do
      it "都道府県名がなければ保存できないこと" do
        prefecture.prefecture_name = nil
        prefecture.valid?
        expect(prefecture.errors[:prefecture_name]).to include("can't be blank")
      end
    end
  end
end
