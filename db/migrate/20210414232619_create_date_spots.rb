class CreateDateSpots < ActiveRecord::Migration[6.1]
  def change
    create_table :date_spots do |t|
      t.integer :category_id
      t.integer :user_id
      t.integer :address_id
      t.string :name
      t.time :business_hour

      t.timestamps
    end
  end
end
