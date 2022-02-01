require 'rails_helper'

RSpec.feature "Courses", type: :feature do
  scenario "デートコース一覧画面に遷移する" do
    visit root_path
    click_link "デートコースを探す"
    expect(page).to have_content "デートコース一覧"
  end

  scenario "デートコース詳細画面に遷移する" do
    
  end

  scenario "デートコース編集画面でデートコースの1番目と3番目を入れ替えて更新する。" do
    
  end

  scenario "デートコース編集画面でデートコースの日付を変更して更新する。" do
    
  end

  scenario "デートコース編集画面でデートコースを公開ステータスから非公開ステータスにて更新する。" do
    
  end
  scenario "デートコース編集画面でデートコースの交通手段を車から徒歩に更新する。" do
    
  end

  scenario "デートコース編集画面でデートコースの交通手段を車から自転車に更新する。" do
    
  end

  scenario "デートコース編集画面でデートコースの交通手段を自転車から車に更新する。" do
    
  end

  scenario "デートコースを削除する" do
    
  end
end