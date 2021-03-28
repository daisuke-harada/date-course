require 'rails_helper'

RSpec.describe User, type: :model do
  it "名前、メール、パスワード、性別があれば有効な状態であること" do
    user = User.new(
      name: "太郎",
      email: "tarou@gmail.com",
      password: "foobar",
      sex: 1,
    )

    expect(user).to be_valid
  end
end
