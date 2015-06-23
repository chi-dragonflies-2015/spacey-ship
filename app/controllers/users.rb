post '/users/login' do
  if @user = User.find_by(username: params[:username])
    session[:user_id] = @user.id
    redirect '/'
  else
    erb :_login
  end
end