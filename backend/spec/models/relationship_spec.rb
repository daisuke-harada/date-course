require 'rails_helper'

RSpec.describe Relationship, type: :model do
  describe "#create" do
    let(:relationship) { FactoryBot.build(:relationship) }
    context "relationshipを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(relationship).to be_valid
      end
    end
  end
end
