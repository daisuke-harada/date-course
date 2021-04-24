require 'rails_helper'

RSpec.feature "DateSpotReviews", type: :feature do
  scenario "デートスポット詳細ページから口コミ新規投稿ページへ遷移し、口コミを新規投稿する" do
    user = FactoryBot.create(:user)
    date_spot = FactoryBot.create(:date_spot)
    date_spot.create_address(FactoryBot.attributes_for(:address))
    date_spot_review = FactoryBot.build(:date_spot_review)
    sign_in_as user
    click_link "デートスポットを探す"
    click_link "このデートスポットを見る"
    click_link "レビューする"
    fill_in "コメント", with: date_spot_review.content
    expect {
      click_button "投稿する"
      expect(page).to have_content "口コミを投稿しました"
    }.to change(DateSpotReview.all, :count).by(1)
  end

  scenario "ログインせずにレビュー新規投稿ページへ遷移しようとすると、ログインページにリダイレクトされる" do
    date_spot = FactoryBot.create(:date_spot)
    date_spot.create_address(FactoryBot.attributes_for(:address))
    visit root_path
    click_link "デートスポットを探す"
    click_link "このデートスポットを見る"
    click_link "レビューする"
    expect(page).to have_content "ログインしてください"
  end

  scenario "管理者でレビュー新規投稿ページへ遷移しようとすると、ログインページにリダイレクトされる" do
    date_spot = FactoryBot.create(:date_spot)
    date_spot.create_address(FactoryBot.attributes_for(:address))
    admin = FactoryBot.create(:admin)
    sign_in_as admin
    click_link "デートスポットを探す"
    click_link "このデートスポットを見る"
    click_link "レビューする"
    expect(page).to have_content "一般ステータスのアカウントでログインしてください"
  end

end