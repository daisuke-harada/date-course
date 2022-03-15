require 'rails_helper'

RSpec.describe DateSpotReview, type: :model do
  describe "#create" do
    let(:user) {FactoryBot.create(:user)}
    let(:date_spot) {FactoryBot.create(:date_spot)}
    let(:date_spot_review) { FactoryBot.build(:date_spot_review) }
    context "date_spot_reviewを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(date_spot_review).to be_valid
      end

      it "コメント内容が100文字以内なら保存できること" do
        date_spot_review.content = "a" * 100
        expect(date_spot_review).to be_valid
      end
    end

    context "date_spot_reviewを保存できない場合" do
      it "コメント内容が100文字を超えていれば保存できないこと" do
        date_spot_review.content = "a" * 101
        date_spot_review.valid?
        expect(date_spot_review.errors[:content]).to include("is too long (maximum is 100 characters)")
      end

      it "user_idとdate_spot_idが空の場合保存できないこと" do
        date_spot_review.user_id = nil
        date_spot_review.date_spot_id = nil
        date_spot_review.valid?
        aggregate_failures do
          expect(date_spot_review.errors[:user_id]).to include("can't be blank")
          expect(date_spot_review.errors[:date_spot_id]).to include("can't be blank")
        end
      end

      it "user_idが空の場合保存できないこと" do
        date_spot_review.user_id = nil
        date_spot_review.valid?
        expect(date_spot_review.errors[:user_id]).to include("can't be blank")
      end

      it "date_spot_idが空の場合保存できないこと" do
        date_spot_review.date_spot_id = nil
        date_spot_review.valid?
        expect(date_spot_review.errors[:date_spot_id]).to include("can't be blank")
      end

      it "1人のユーザーが1つのデートスポットに二回以上レビューが保存できないこと" do
        FactoryBot.create(:date_spot_review)
        other_date_spot_review = FactoryBot.build(:date_spot_review)
        other_date_spot_review.valid?
        expect(other_date_spot_review.errors[:user_id]).to include("has already been taken")
      end
    end
  end
end
