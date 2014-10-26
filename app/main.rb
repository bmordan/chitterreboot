#Setup for the enviroment

env = ENV["RACK_ENV"] || "development"

#Setup for the app

require 'sinatra'
require 'rack-protection'
require 'data_mapper'
require 'dm-serializer/to_json'
require 'rest_client'

#Set up database tables for sinatra

require_relative 'models/peep'
require_relative 'models/poop'
require_relative 'models/user'

#Setting for handly seeding functionality

require_relative './seed'
include Seed #run in irb: _multiseed

# Setup for Sinatra

set :root, File.dirname(__FILE__)
set :public_folder, Proc.new { File.join(root, "public") }
set :views, Proc.new { File.join(root, "public") }
enable :sessions
set :session_secret, 'OYJEVFIKHZORXTUXXOYXXGPDEYLLPWXD'
use Rack::MethodOverride
use Rack::Protection::EscapedParams

# Setup DataMapper

if ENV["RACK_ENV"] == "production"
  DataMapper.setup(:default, ENV["DATABASE_URL"])
else
  DataMapper.setup(:default, "postgres://localhost/chitter_#{env}")
end
DataMapper.finalize
DataMapper.auto_upgrade!

# Send the user the first page

get '/' do
  erb :index
end

get '/api/chitter' do
  content_type :json
  @peeps = Peep.all(:order => [:created_at.desc])
  @peeps_feed = @peeps.to_json(
    :relationships => {
      :user => {:exclude => [:password_digest,:email]},
      :poop => {:only => [:poop]}
    }
  )
  erb :json
end





