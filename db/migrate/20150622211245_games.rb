class Games < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :score
      t.references :player

      t.timestamps null: false
    end
  end
end
