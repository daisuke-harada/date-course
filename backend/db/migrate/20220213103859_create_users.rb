class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :gender
      t.boolean :admin, default: false
      t.string :password_digest

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :name, unique: true
  end
end
