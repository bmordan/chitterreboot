$(document).ready(function(){
  
  var id = $('main samp').html()
// If a user is not logged in
  if( id === '' ){
    $('section.preauth').append()
    $('main').hide()
    $('header nav ul li a.peep-button').hide()
    $('header nav ul li i.fa').hide()
    $('#peep-dialog').hide()
  }else{
    // grab the data
    $.get('/api/chitter', function(data){
      var peepsTemplate   = Handlebars.compile( $('template.peeps').html()   )
      var profileTemplate = Handlebars.compile( $('template.profile').html() )
      var totalPeeps = 0
      // render the user profile template
      for(var i=0;i<data.length;i+=1){
        if (data[i].user.id === parseInt(id)) {
          var profileHtml = profileTemplate({name: data[i].user.name, handle: data[i].user.handle, totalPeeps: totalPeeps +=1 })
        }
      }
      //populate the user section
      $('main section.peep-profile').append(profileHtml)
      // manage the click and reveal peep input box
      $('#profile-peep').focus( function() {
        $(this).attr('placeholder','').attr('rows','5')
        $('main section artical form').toggleClass('input')
        $('main section artical form div').show()
        $('main section artical form a.peep-button').show()
        $('main section artical form div').css('height','1.1em')
        $('main section artical form a.peep-button').css('opacity','0.5')
        $(this).on('input', function() {
          $('main section artical form a.peep-button').css('opacity','1')
          var length = (144 - parseInt($(this).val().length))
          $('div.peep-counter').text(length)
        })
        $('.peep-button').click(function(){
          var peep = $('#profile-peep').val()
          $.post('/api/chitter',{peep: peep,user_id: id},function(){
            window.location.assign('/')
          })
        })
      })
      $('#profile-peep').blur( function() {
        $(this).attr('placeholder','compose a new peep').attr('rows','1')
        $('main section artical form').toggleClass('input')
        $('main section artical form div').css('height','0em')
        $('main section artical form a.peep-button').hide()
        $('main section artical form div.peep-counter').hide()
        $('main section artical form textarea').val('')  
      })

      for(var i=0;i<data.length;i+=1){
        $('main section.peep').append( peepsTemplate(data[i]) )
      }

    })
    $('section.preauth').remove()
    $('main').show()
    $('main div.peep-counter').hide()
    $('header nav ul li a.peep-button').show()
    $('header nav ul li a.peep-button').click(function(){
      $('#peep-dialog textarea').val('')
      $('#peep-dialog footer div.peep-counter').text(144)
      $('#peep-dialog').show()
      $('#peep-dialog textarea').on('input', function() {
        var length = (144 - parseInt($(this).val().length))
        $('#peep-dialog footer div.peep-counter').text(length)
      })
      $('#pop-peep-button').click(function(){
        var peep = $('div#peep-dialog textarea').val();
        console.log(peep,id)
        $.post('/api/chitter',{peep: peep,user_id: id},function(){
          window.location.assign('/')
        })
      })
      $('#peep-dialog').dialog({ 
        minWidth: 640 ,
        show: { effect: "blind", duration: 800 },
        open: function(event,ui) {
          $('.ui-dialog-titlebar-close')
          .removeClass("ui-dialog-titlebar-close")
          .html('<span style="float:right;">X</span>');
        }
      })
    })

    $('header nav ul li i.fa').show()
    $('header nav ul li i').click(function() { //signout
    $.post('/',{handle: undefined, password: undefined}, function() {
      window.location.assign('/')
    })

  })
  }

  $('body section.preauth artical form a.peep-button').click(function(){
    var handle = $('#handle').val()
    var password = $('#password').val()
    $.post('/',{handle: handle, password: password}, function() {
      window.location.assign('/')
    })
  })



  
 
})