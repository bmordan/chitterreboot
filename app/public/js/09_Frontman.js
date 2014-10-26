$(document).ready(function(){
  
  var user = localStorage.user_id
  if(user === undefined){
    $('section.preauth').show()
    $('main').hide()
    $('header nav ul li a.peep-button').hide()
  }else{
    $('section.preauth').hide()
    $('main').show()
    $('header nav ul li a.peep-button').show()
  }
  

  $.get('/api/chitter', function(data){
    var peepsTemplate   = Handlebars.compile( $('template.peeps').html()   )
    var profileTemplate = Handlebars.compile( $('template.profile').html() )
    var profileHtml = profileTemplate({name: "Bernard Mordan",handle: "bmordan",totalPeeps: 14})
    $('main section.peep-profile').append(profileHtml)
    for(var i=0;i<data.length;i+=1){
      $('main section.peep').append( peepsTemplate(data[i]) )
    } 
  })

})