class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.references :user, null: false, foreign_key: true
      t.datetime :scheduled_time
      t.boolean :authority, default: true
      t.timestamps
    end
  end
end
