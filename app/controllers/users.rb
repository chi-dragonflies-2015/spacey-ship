get '/users/login' do
  if active_session?
    redirect '/game'
  else
    erb :'users/login'
  end
end

post '/sessions' do
  if @user = User.find_by(username: params[:username])
    session[:user_id] = @user.id
    redirect '/game'
  else
    erb :'users/login'
  end
end

get '/users/new' do
  erb :'users/new'
end

get '/users/show' do
  erb :leaderboard
end

post '/users' do
  user = User.new(params[:user])
  if user.save
    session[:user_id] = user.id
    redirect '/game'
  else
    erb :'users/new'
  end
end

get '/logout' do
  session[:user_id] = nil
  redirect '/'
end

delete '/sessions' do
  session[:user_id] = nil
  redirect '/'
end