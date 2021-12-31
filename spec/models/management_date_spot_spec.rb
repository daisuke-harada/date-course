require 'rails_helper'

RSpec.describe ManagementDateSpot, type: :model do
  describe "#create" do
    let(:management_date_spot) { FactoryBot.build(:management_date_spot) }
    context "management_date_spotを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(management_date_spot).to be_valid
      end
    end
  end
end
