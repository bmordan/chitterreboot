module SignUp
  def _signup(email = "test@test.org",password = "passw0rd")
    visit '/users/signup'
    fill_in :email,    :with => email
    fill_in :name,     :with => "User Name"
    fill_in :handle,   :with => "u5rnme"
    fill_in :password, :with => password
    click_on 'Join Chitter'    
  end

  def _signin
    visit '/peeps/home'
    click_link 'log in'
    fill_in :handle, :with => "or1gin"
    fill_in :password, :with => "passw0rd"
    click_on 'Log in'
  end
end