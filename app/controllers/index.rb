get '/' do
  if active_session?
    erb :index
  else
    erb :_login
  end
end