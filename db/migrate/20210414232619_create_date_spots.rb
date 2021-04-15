class CreateDateSpots < ActiveRecord::Migration[6.1]
  def change
    create_table :date_spots do |t|
      t.integer :category_id
      t.integer :user_id
      t.string :name
      t.string :business_hour

      t.timestamps
    end
  end
end
