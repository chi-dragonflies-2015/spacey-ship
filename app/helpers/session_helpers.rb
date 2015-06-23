helpers do
  def active_session?
    !!session[:user_id]
  end
end