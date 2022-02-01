class CreateAddresses < ActiveRecord::Migration[6.1]
  def change
    create_table :addresses do |t|
      t.integer :prefecture_id, foreign_key: true
      t.integer :date_spot_id, foreign_key: true
      t.string :city_name
      t.float :latitude
      t.float :longitude
      t.timestamps
    end
    add_index :addresses, [:prefecture_id, :created_at]
    add_index :addresses, [:date_spot_id, :created_at]
  end
end
