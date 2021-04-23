require 'rails_helper'

RSpec.feature "DateSpotReviews", type: :feature do
  scenario "デートスポット詳細ページから口コミ新規投稿ページへ遷移し、口コミを新規投稿する" do
    user = FactoryBot.create(:user)
    date_spot = FactoryBot.create(:date_spot)
    date_spot_review = FactoryBot.build(:date_spot_review)
    sign_in_as user
    click_link "デートスポットを探す"
    click_link "このデートスポットを見る"
    click_link "口コミを投稿する"
    fill_in "コメント", with: date_spot_review.content
    expect {
      click_button "投稿する"
      expect(page).to have_content "口コミを投稿しました"
    }.to change(DateSpotReview.all, :count).by(1)
  end
end