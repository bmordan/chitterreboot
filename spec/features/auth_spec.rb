require 'spec_helper'

feature "Authentication" do

  def _auth
    visit '/'
    fill_in :handle, :with => "darth"
    fill_in :password, :with => "password"
    click_link 'Peep'
  end

  scenario "you have to sign in dude" do
    visit '/'
    expect(page).to_not have_content('Join the conversation')
  end
  

end