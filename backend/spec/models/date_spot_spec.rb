require 'rails_helper'

RSpec.describe DateSpot, type: :model do
  describe "#create" do
    let(:date_spot) { FactoryBot.build(:date_spot) }

    context "dates_spotを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(date_spot).to be_valid
      end
    end

    context "dates_spotを保存できない場合" do
      it "名前が入力されていなければ保存できないこと" do
        date_spot.name = nil
        date_spot.valid?
        expect(date_spot.errors[:name]).to include("can't be blank")
      end

      it "ジャンルが選択されていなければ保存できないこと" do
        date_spot.genre_id = nil
        date_spot.valid?
        expect(date_spot.errors[:genre_id]).to include("can't be blank")
      end
    end
  end
end
