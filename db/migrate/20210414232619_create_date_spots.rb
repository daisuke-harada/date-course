class CreateDateSpots < ActiveRecord::Migration[6.1]
  def change
    create_table :date_spots do |t|
      t.integer :category_id
      t.string :name
      t.string :opening_time
      t.string :closing_time

      t.timestamps
    end
  end
end
