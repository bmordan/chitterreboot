class Peep
  include DataMapper::Resource

  property :id, Serial
  property :peep, String, :length => 144, :required => true
  property :created_at,      DateTime
  property :updated_at,      DateTime

  belongs_to :user
  has n, :poops

end