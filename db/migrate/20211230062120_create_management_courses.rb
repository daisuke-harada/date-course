class CreateManagementCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :management_courses do |t|
      t.references :course, null: false, foreign_key: true
      t.references :date_spot, null: false, foreign_key: true

      t.timestamps
    end
  end
end
