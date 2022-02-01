require 'rails_helper'

RSpec.describe Course, type: :model do
  describe "#create" do
    let(:course) { FactoryBot.build(:course) }
    context "courseを保存できる場合" do
      it "正常値の場合、保存できること" do
        expect(course).to be_valid
      end
    end
  end
end
