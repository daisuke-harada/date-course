class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.references :user, null: false, foreign_key: true
      t.string :traffic_mode, null: false
      t.string :authority, null: false
      t.timestamps
    end
  end
end
