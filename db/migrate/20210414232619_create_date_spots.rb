class CreateDateSpots < ActiveRecord::Migration[6.1]
  def change
    create_table :date_spots do |t|
      t.integer :genre_id
      t.string :name
      t.datetime :opening_time
      t.datetime :closing_time

      t.timestamps
    end
  end
end
