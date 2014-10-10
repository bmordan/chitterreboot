require 'bcrypt'

class User

  include DataMapper::Resource

  property :id,         Serial
  property :email,      String, :unique => true, :message => "That email is already taken"
  property :name,       String
  property :handle,     String, :unique => true, :message => "That handle is in use, sorry try another"
  property :password,   Text,   :lazy   => false
  property :created_at, DateTime
  property :updated_at, DateTime

  #has n, :peeps
  
end