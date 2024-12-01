class CreateDateSpotReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :date_spot_reviews do |t|
      t.float :rate
      t.text :content
      t.references :user, foreign_key: true
      t.references :date_spot, foreign_key: true

      t.timestamps
    end
  end
end
