require 'rails_helper'

RSpec.feature "DateSpotReviews", type: :feature do
  scenario "デートスポット詳細ページからレビュー新規投稿ページへ遷移し、レビューを新規投稿する" do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    date_spot_review = FactoryBot.build(:date_spot_review)
    sign_in_as user
    click_link "デートスポットを探す"
    click_link "このデートスポットを見る"
    click_link "レビューする"
    fill_in "コメント", with: date_spot_review.content
    expect {
      click_button "投稿する"
      expect(page).to have_content "投稿しました"
    }.to change(DateSpotReview.all, :count).by(1)
  end

  scenario "デートスポット詳細ページからレビュー編集ページに遷移して、レビューを編集する" do
    date_spot_review = FactoryBot.create(:date_spot_review)
    date_spot_review.date_spot.create_address(FactoryBot.attributes_for(:address))
    sign_in_as date_spot_review.user
    click_link "デートスポットを探す"
    click_link "このデートスポットを見る"
    click_link "レビューを編集する"
    fill_in "コメント", with: "My String2"
    click_button "更新する"
    expect(page).to have_content "投稿内容を更新しました"
  end

  scenario "デートスポット詳細ページからレビュー編集ページに遷移して、レビューを削除する" do
    date_spot_review = FactoryBot.create(:date_spot_review)
    date_spot_review.date_spot.create_address(FactoryBot.attributes_for(:address))
    sign_in_as date_spot_review.user
    click_link "デートスポットを探す"
    click_link "このデートスポットを見る"
    click_link "レビューを編集する"
    expect {
      click_button "削除"
      expect(page).to have_content "投稿内容を削除しました"
    }.to change(DateSpotReview.all, :count).by(-1)
  end

  scenario "ログインせずにレビュー新規投稿ページへ遷移しようとすると、ログインページにリダイレクトされる" do
    address = FactoryBot.create(:address)
    visit root_path
    click_link "デートスポットを探す"
    click_link "このデートスポットを見る"
    click_link "レビューする"
    expect(page).to have_content "ログインしてください"
  end

  scenario "管理者でレビュー新規投稿ページへ遷移しようとすると、ログインページにリダイレクトされる" do
    address = FactoryBot.create(:address)
    admin = FactoryBot.create(:admin)
    sign_in_as admin
    click_link "デートスポットを探す"
    click_link "このデートスポットを見る"
    click_link "レビューする"
    expect(page).to have_content "一般ステータスのアカウントでログインしてください"
  end

end