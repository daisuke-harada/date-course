class CreateDateSpotReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :date_spot_reviews do |t|
      t.integer :user_id
      t.integer :spot_id
      t.integer :rate
      t.text :content

      t.timestamps
    end
  end
end
