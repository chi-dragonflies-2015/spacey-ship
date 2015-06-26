helpers do
  def active_session?
    !!session[:user_id]
  end

  def current_user
    active_session? ? User.find_by(id: session[:user_id]) : nil
  end
end