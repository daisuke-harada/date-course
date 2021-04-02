module LoginSupport
  def sign_in_as(user)
    visit root_path
    click_link ""
  end
end