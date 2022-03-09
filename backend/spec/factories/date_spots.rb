FactoryBot.define do
  factory :date_spot do
    id { 1 }
    name { "キャナルシティ博多" }
    genre_id { Genre.find_by(id: 1).id }
    opening_time { "2000-01-01 08:00:00 UTC" }
    closing_time { "2000-01-01 23:00:00 UTC" }
  end
end
