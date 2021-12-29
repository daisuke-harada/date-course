class CreateManagementCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :management_courses do |t|
      t.integer :course_id
      t.integer :spot_id
      t.timestamps
    end
  end
end
