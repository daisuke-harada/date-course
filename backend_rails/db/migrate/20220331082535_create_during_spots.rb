class CreateDuringSpots < ActiveRecord::Migration[6.1]
  def change
    create_table :during_spots do |t|
      t.references :course, null: false, foreign_key: true
      t.references :date_spot, null: false, foreign_key: true

      t.timestamps
    end
  end
end
