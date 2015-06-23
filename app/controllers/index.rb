get '/' do
  if activeSession?
    erb :index
  else
    erb :_login
  end
end