class CreateManagements < ActiveRecord::Migration[6.1]
  def change
    create_table :managements do |t|
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :managements, [:user_id, :created_at]
  end
end
