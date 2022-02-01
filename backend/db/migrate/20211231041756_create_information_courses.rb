class CreateInformationCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :information_courses do |t|
      t.references :course, null: false, foreign_key: true
      t.references :date_spot, null: false, foreign_key: true

      t.timestamps
    end
    add_index :information_courses, [:course_id, :created_at]
    add_index :information_courses, [:date_spot_id, :created_at]
  end
end
