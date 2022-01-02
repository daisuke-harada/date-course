require 'rails_helper'

RSpec.describe Management, type: :model do
  describe "#create" do
    let(:management) { FactoryBot.build(:management) }
    context "managementを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(management).to be_valid
      end
    end
  end
end
