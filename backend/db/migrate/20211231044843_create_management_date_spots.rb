class CreateManagementDateSpots < ActiveRecord::Migration[6.1]
  def change
    create_table :management_date_spots do |t|
      t.references :management, null: false, foreign_key: true
      t.references :date_spot, null: false, foreign_key: true
      
      t.timestamps
    end
    add_index :management_date_spots, [:management_id, :created_at]
    add_index :management_date_spots, [:date_spot_id, :created_at], unique: true
  end
end
