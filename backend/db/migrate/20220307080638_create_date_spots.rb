class CreateDateSpots < ActiveRecord::Migration[6.1]
  def change
    create_table :date_spots do |t|
      t.integer :genre_id, foreign_key: true
      t.string :name
      t.string :image
      t.datetime :opening_time
      t.datetime :closing_time

      t.timestamps
    end
    add_index :date_spots, [:genre_id, :created_at]
  end
end
