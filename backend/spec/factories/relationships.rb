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
FactoryBot.define do
  factory :relationship do
    user_id { 1 }
    follow_id { 2 }
  end
end
