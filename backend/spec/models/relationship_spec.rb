require 'rails_helper'

RSpec.describe Relationship, type: :model do
  describe "#create" do
    context "relatiohshipを保存できる場合" do
      let(:relationship) { FactoryBot.build(:relationship) }
      it "正常値の場合、保存できること" do
        FactoryBot.create(:user)
        FactoryBot.create(:other_user)
        expect(relationship).to be_valid
      end
    end
  end
end
