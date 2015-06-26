post '/games/new' do
  game = Game.new(score: params[:score], player: current_user)
  if game.save
    if current_user.highscore < game.score
      current_user.update_attributes(highscore: game.score)
    end
  end
end