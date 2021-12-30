FactoryBot.define do
  factory :relationship do
    id { 1 }
    user_id { FactoryBot.create(:user).id }
    follow_id { FactoryBot.create(:other_user).id }
  end
end
