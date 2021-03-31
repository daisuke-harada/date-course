require 'rails_helper'

RSpec.describe User, type: :model do
  describe "#create" do
    let(:user) { FactoryBot.build(:user) }
    context "userを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(user).to be_valid
      end

      it "名前が50文字以内なら保存できること" do
        user.name = "a" * 50
        expect(user).to be_valid
      end

      it "メールアドレスが250文字以内なら保存できること" do
        user.email = "a"* 240 + "@gamil.com" 
        expect(user).to be_valid
      end

      it "パスワードが6文字以上なら保存できること" do
        user.password = "a"*6
        expect(user).to be_valid
      end
    end

    context "userを保存できない場合" do
      it "名前がなければ保存できないこと" do
        user.name = nil
        user.valid?
        expect(user.errors[:name]).to include("can't be blank")
      end

      it "名前の文字数が50文字を超えていると保存できないこと" do
        user.name = "a" * 51
        user.valid?
        expect(user.errors[:name]).to include("is too long (maximum is 50 characters)")
      end

      it "メールアドレスが入力されていなければ保存できないこと" do
        user.email = nil
        user.valid?
        expect(user.errors[:email]).to include("can't be blank")
      end

      it "メールアドレスの文字数が250文字を超えていると保存できないこと" do
        user.email = "a" * 241 + "@gamil.com"
        user.valid?
        expect(user.errors[:email]).to include("is too long (maximum is 250 characters)")
      end

      it "すでに登録されているメールアドレスは保存できないこと"
        other_user = FactoryBot.create(:user)
        

      it "性別が入力されていなければ保存できないこと" do
        user.sex = nil
        user.valid?
        expect(user.errors[:sex]).to include("can't be blank")
      end
    end
  end
end
