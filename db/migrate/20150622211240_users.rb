class Users < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, uniqueness: :true
      t.integer :highscore, default: 0

      t.timestamps null: false
    end
  end
end
