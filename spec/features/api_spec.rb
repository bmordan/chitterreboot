require 'spec_helper'

feature "API" do

  before(:each) do
    Peep.create(peep: "Test peep",user_id: 1)
  end

  scenario "the api has a json string" do
    visit '/api/chitter'
    expect(page).to have_content(/[\[{"id":(\s|\S)}\]]/)
  end

end
