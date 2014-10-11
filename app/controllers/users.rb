get '/users/signup' do
  erb :"users/signup"
end

post '/users/signup' do
  @user = User.create(
    :email => params[:email],
    :name => params[:name],
    :handle => params[:handle],
    :password => params[:password]
    )
  if @user.save
    session[:user_id] = @user.id
    redirect to '/peeps/home'
  else
    redirect to '/users/signup', errors: @user.errors.full_messages
  end
end

get '/users/login' do
  erb :"users/login"
end

post '/users/login' do
  @user = User.authenticate(params[:handle],params[:password])
  if @user
    session[:user_id] = @user.id
    redirect to '/peeps/home'
  else
    flash[:notice] = "Thats not #{params[:handle]}'s password"
    redirect to '/users/login'
  end 
end