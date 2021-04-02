module LoginSupport
  def sign_in_as(user)
    visit root_path
    click_link "ログイン"
    fill_in "名前", with: user.name
    fill_in "パスワード", with: user.password
    click_button "ログイン"
  end
end

RSpec.configure do |config|
  config.include LoginSupport
end