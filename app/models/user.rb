class User < ActiveRecord::Base
  has_many :games, foreign_key: :player_id
end
