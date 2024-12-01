# == Schema Information
#
# Table name: date_spots
#
#  id           :bigint           not null, primary key
#  closing_time :datetime
#  image        :string
#  name         :string
#  opening_time :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  genre_id     :integer
#
# Indexes
#
#  index_date_spots_on_genre_id_and_created_at  (genre_id,created_at)
#
require "rails_helper"

RSpec.describe DateSpot, type: :model do
  describe "#create" do
    let(:date_spot) { build(:date_spot) }

    context "dates_spotを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(date_spot).to be_valid
      end
    end

    context "dates_spotを保存できない場合" do
      it "名前が入力されていなければ保存できないこと" do
        date_spot.name = nil
        date_spot.valid?
        expect(date_spot.errors[:name]).to include("を入力してください")
      end

      it "ジャンルが選択されていなければ保存できないこと" do
        date_spot.genre_id = nil
        date_spot.valid?
        expect(date_spot.errors[:genre_id]).to include("を入力してください")
      end
    end
  end
end
