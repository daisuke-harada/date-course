# == Schema Information
#
# Table name: relationships
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  follow_id  :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_relationships_on_follow_id  (follow_id)
#  index_relationships_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (follow_id => users.id)
#  fk_rails_...  (user_id => users.id)
#
require "rails_helper"

RSpec.describe Relationship, type: :model do
  describe "#create" do
    context "relatiohshipを保存できる場合" do
      let(:relationship) { build(:relationship) }
      let!(:user) { create(:user) }
      let!(:other_user) { create(:other_user) }

      it "正常値の場合、保存できること" do
        expect(relationship).to be_valid
      end
    end
  end
end
