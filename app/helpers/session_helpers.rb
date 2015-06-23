helpers do
  def activeSession?
    !!session[:user_id]
  end
end