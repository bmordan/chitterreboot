require 'spec_helper'

feature "In order to use chitter I" do

  before(:each) do
    User.create(
      :email => "test@test.org",
      :password => "passw0rd",
      :name => "User Name",
      :handle => "u5rnme"
    )
  end

  scenario "want to sing up" do
    signup
    expect(page).to have_content("Hay User Name")
  end

  scenario "join the users table" do
    expect(User.count).to eq 1
  end

end