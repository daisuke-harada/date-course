class CreateDateSpotReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :date_spot_reviews do |t|
      t.integer :rate
      t.text :content
      t.references :user, foreign_key: true
      t.references :date_spot, foreign_key: true

      t.timestamps
    end
    add_index :date_spot_reviews, [:user_id, :created_at]
    add_index :date_spot_reviews, [:date_spot_id, :created_at]
  end
end
