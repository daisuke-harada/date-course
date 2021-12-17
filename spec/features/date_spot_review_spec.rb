require 'rails_helper'

RSpec.feature "DateSpotReviews", type: :feature do
  scenario "デートスポット詳細ページからレビュー新規投稿ページへ遷移し、レビューを新規投稿する", js: true do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    address.date_spot.image = fixture_file_upload('app/assets/images/test_image.jpg')
    date_spot_review = FactoryBot.build(:date_spot_review)
    sign_in_as user
    click_link "デートスポットを探す"
    click_link "デートスポットを見る"
    click_link "レビューする"
    find("#star-5-left").click
    fill_in "コメント", with: date_spot_review.content
    expect do
      click_button "投稿する"
      expect(page).to have_content "投稿しました"
      expect(page).to have_content "4.5"
      expect(page).to have_content "MyText"
    end.to change(DateSpotReview.all, :count).by(1)
  end

  scenario "レビューを評価値3で新規投稿し、その後、評価値を0.5に編集する。", js: true do
    user = FactoryBot.create(:user)
    address = FactoryBot.create(:address)
    address.date_spot.image = fixture_file_upload('app/assets/images/test_image.jpg')
    date_spot_review = FactoryBot.build(:date_spot_review)
    sign_in_as user
    click_link "デートスポットを探す"
    click_link "デートスポットを見る"
    click_link "レビューする"
    find("#star-3-right").click
    fill_in "コメント", with: date_spot_review.content
    expect do
      click_button "投稿する"
      expect(page).to have_content "投稿しました"
      expect(page).to have_content "3"
      expect(page).to have_content "MyText"
    end.to change(DateSpotReview.all, :count).by(1)
    click_link "レビューを編集する"
    find("#star-1-left").click
    click_button "更新する"
    expect(page).to have_content "レビューを更新しました"
    expect(page).to have_content "0.5"
    expect(page).to have_content "MyText"
  end

  scenario "デートスポット詳細ページからレビュー編集ページに遷移して、レビューを編集する", js: true do
    date_spot_review = FactoryBot.create(:date_spot_review)
    date_spot_review.date_spot.create_address(FactoryBot.attributes_for(:address))
    sign_in_as date_spot_review.user
    click_link "デートスポットを探す"
    click_link "デートスポットを見る"
    click_link "レビューを編集する"
    find("#star-3-left").click
    fill_in "コメント", with: "My String2"
    click_button "更新する"
    expect(page).to have_content "レビューを更新しました"
    expect(page).to have_content "2.5"
    expect(page).to have_content "My String2"
  end

  scenario "デートスポット詳細ページからレビュー編集ページに遷移して、レビューを削除する" do
    date_spot_review = FactoryBot.create(:date_spot_review)
    date_spot_review.date_spot.create_address(FactoryBot.attributes_for(:address))
    sign_in_as date_spot_review.user
    click_link "デートスポットを探す"
    click_link "デートスポットを見る"
    click_link "レビューを編集する"
    expect do
      click_link "削除する"
      expect(page).to have_content "レビューを削除しました"
    end.to change(DateSpotReview.all, :count).by(-1)
  end

  scenario "デートスポット詳細ページから、レビューを削除する" do
    date_spot_review = FactoryBot.create(:date_spot_review)
    date_spot_review.date_spot.create_address(FactoryBot.attributes_for(:address))
    sign_in_as date_spot_review.user
    click_link "デートスポットを探す"
    click_link "デートスポットを見る"
    expect do
      click_link "削除する"
      expect(page).to have_content "レビューを削除しました"
    end.to change(DateSpotReview.all, :count).by(-1)
  end

  scenario "ログインせずにレビュー新規投稿ページへ遷移しようとすると、ログインページにリダイレクトされる" do
    FactoryBot.create(:address)
    visit root_path
    click_link "デートスポットを探す"
    click_link "デートスポットを見る"
    click_link "レビューする"
    expect(page).to have_content "ログインしてください"
  end

  scenario "管理者でレビュー新規投稿ページへ遷移しようとすると、ログインページにリダイレクトされる" do
    FactoryBot.create(:address)
    admin = FactoryBot.create(:admin)
    sign_in_as admin
    click_link "デートスポットを探す"
    click_link "デートスポットを見る"
    click_link "レビューする"
    expect(page).to have_content "一般ステータスのアカウントでログインしてください"
  end
end
