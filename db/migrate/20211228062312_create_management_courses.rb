class CreateManagementCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :management_courses do |t|

      t.timestamps
    end
  end
end
