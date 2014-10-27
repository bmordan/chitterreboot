$(document).ready(function(){
  
  var id = $('main samp').html()

  if( id === '' ){
    $('section.preauth').append()
    $('main').hide()
    $('header nav ul li a.peep-button').hide()
    $('header nav ul li i.fa').hide()
  }else{
    $.get('/api/chitter', function(data){
      var peepsTemplate   = Handlebars.compile( $('template.peeps').html()   )
      var profileTemplate = Handlebars.compile( $('template.profile').html() )
      var totalPeeps = 0

      for(var i=0;i<data.length;i+=1){
        if (data[i].user.id === parseInt(id)) {
          var profileHtml = profileTemplate({name: data[i].user.name, handle: data[i].user.handle, totalPeeps: totalPeeps +=1 })
        }
      }

      $('main section.peep-profile').append(profileHtml)

      $('#profile-peep').focus( function() {
        $(this).attr('placeholder','').attr('rows','5')
        $('main section artical form').toggleClass('input')
        $('main section artical form a.peep-button').show()
        $('main section artical form div').css('height','1.1em')
        $('main section artical form a.peep-button').css('opacity','0.5')
        $(this).on('input', function() {
          $('main section artical form a.peep-button').css('opacity','1')
        })
        $('.peep-button').click(function(){
          var peep = $('#profile-peep').val()
          $.post('/api/chitter',{peep: peep,user_id: id},function(){
            window.location.assign('/')
          })
        })
      })
      $('#profile-peep').blur( function() {
        if($(this).val() === ''){
          $(this).attr('placeholder','compose a new peep').attr('rows','1')
          $('main section artical form').toggleClass('input')
          $('main section artical form div').css('height','0em')
          $('main section artical form a.peep-button').hide()
        }
        
      })

      for(var i=0;i<data.length;i+=1){
        $('main section.peep').append( peepsTemplate(data[i]) )
      }

    })
    $('section.preauth').remove()
    $('main').show()
    $('header nav ul li a.peep-button').show()
    $('header nav ul li i.fa').show()
  }

  $('body section.preauth artical form a.peep-button').click(function(){
    var handle = $('#handle').val()
    var password = $('#password').val()
    $.post('/',{handle: handle, password: password}, function() {
      window.location.assign('/')
    })
  })

  $('header nav ul li i').click(function() {
    $.post('/',{handle: undefined, password: undefined}, function() {
      window.location.assign('/')
    })
  })

  
 
})