require "rails_helper"

RSpec.describe User, type: :model do
  describe "#create" do
    let(:user) { FactoryBot.build(:user) }
    context "userを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(user).to be_valid
      end

      it "正常値の場合、admin属性がtrueのuserも保存できること" do
        admin = FactoryBot.build(:admin)
        expect(admin).to be_valid
      end

      it "名前が50文字以内なら保存できること" do
        user.name = "a" * 50
        expect(user).to be_valid
      end

      it "メールアドレスが250文字以内なら保存できること" do
        user.email = "a" * 240 + "@gamil.com"
        expect(user).to be_valid
      end

      it "パスワードが6文字以上なら保存できること" do
        user.password = user.password_confirmation = "a" * 6
        expect(user).to be_valid
      end
    end

    context "userを保存できない場合" do
      it "名前がなければ保存できないこと" do
        user.name = nil
        user.valid?
        expect(user.errors[:name]).to include("を入力してください")
      end

      it "名前の文字数が50文字を超えていると保存できないこと" do
        user.name = "a" * 51
        user.valid?
        expect(user.errors[:name]).to include("は50文字以内で入力してください")
      end

      it "すでに登録されている名前は保存できないこと" do
        FactoryBot.create(:user)
        user.valid?
        expect(user.errors[:name]).to include("はすでに存在します")
      end

      it "メールアドレスが入力されていなければ保存できないこと" do
        user.email = nil
        user.valid?
        expect(user.errors[:email]).to include("を入力してください")
      end

      it "メールアドレスの文字数が250文字を超えていると保存できないこと" do
        user.email = "a" * 241 + "@gamil.com"
        user.valid?
        expect(user.errors[:email]).to include("は250文字以内で入力してください")
      end

      it "すでに登録されているメールアドレスは保存できないこと" do
        FactoryBot.create(:user)
        user.valid?
        expect(user.errors[:email]).to include("はすでに存在します")
      end

      it "性別が入力されていなければ保存できないこと" do
        user.gender = nil
        user.valid?
        expect(user.errors[:gender]).to include("を入力してください")
      end
    end
  end
end
