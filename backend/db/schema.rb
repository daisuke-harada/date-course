# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2022_03_31_082535) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.integer "prefecture_id"
    t.integer "date_spot_id"
    t.string "city_name"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["date_spot_id", "created_at"], name: "index_addresses_on_date_spot_id_and_created_at"
    t.index ["prefecture_id", "created_at"], name: "index_addresses_on_prefecture_id_and_created_at"
  end

  create_table "courses", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "travel_mode", null: false
    t.string "authority", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_courses_on_user_id"
  end

  create_table "date_spot_reviews", force: :cascade do |t|
    t.float "rate"
    t.text "content"
    t.bigint "user_id"
    t.bigint "date_spot_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["date_spot_id"], name: "index_date_spot_reviews_on_date_spot_id"
    t.index ["user_id"], name: "index_date_spot_reviews_on_user_id"
  end

  create_table "date_spots", force: :cascade do |t|
    t.integer "genre_id"
    t.string "name"
    t.string "image"
    t.datetime "opening_time", precision: nil
    t.datetime "closing_time", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["genre_id", "created_at"], name: "index_date_spots_on_genre_id_and_created_at"
  end

  create_table "during_spots", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.bigint "date_spot_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_during_spots_on_course_id"
    t.index ["date_spot_id"], name: "index_during_spots_on_date_spot_id"
  end

  create_table "relationships", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "follow_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["follow_id"], name: "index_relationships_on_follow_id"
    t.index ["user_id"], name: "index_relationships_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "gender"
    t.string "image"
    t.boolean "admin", default: false
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name", unique: true
  end

  add_foreign_key "courses", "users"
  add_foreign_key "date_spot_reviews", "date_spots"
  add_foreign_key "date_spot_reviews", "users"
  add_foreign_key "during_spots", "courses"
  add_foreign_key "during_spots", "date_spots"
  add_foreign_key "relationships", "users"
  add_foreign_key "relationships", "users", column: "follow_id"
end
