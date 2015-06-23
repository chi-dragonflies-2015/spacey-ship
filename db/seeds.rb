30.times do
  user = User.create(username: Faker::Internet.user_name, password: Faker::Lorem.word)
  5.times do
    user.games << Game.create(score: rand(30)+1)
  end
  user.highscore = user.games.map {|game| game.score}.max
  user.save
end