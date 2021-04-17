require 'rails_helper'

RSpec.describe Address, type: :model do
  describe "#create" do
    let(:address) { FactoryBot.build(:address) }
    context "addressを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(address).to be_valid
      end
    end
  end
end
