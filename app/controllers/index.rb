get '/' do
  if active_session?
    erb :game
  else
    erb :index
  end
end

get '/game' do
  erb :game
end