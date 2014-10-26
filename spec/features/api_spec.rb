require 'spec_helper'

feature "API" do

  before(:each) do
    User.create(
      :email => "default@test.org",
      :password => "passw0rd",
      :name => "First User",
      :handle => "or1gin"
    )
    Peep.create(peep: "Test peep",user_id: User.first.id)
  end

  scenario "the api serves data as json" do
    visit '/api/chitter'
    expect(page).to have_content(/[\[{"id":(\s|\S)}\]]/)
  end

  scenario "the feed includes data from the user model" do
    visit '/api/chitter'
    expect(page).to have_content("handle")
  end

  scenario "the feed excludes a users password_digest and email" do
    visit '/api/chitter'
    expect(page).to_not have_content("password_digest")
  end

  xscenario "the feed is accessable through a simple get request" do
    visit '/'
    expect(page).to have_content("Test peep")
  end 

end
