$('#del').click(function(){
  var text = $('#uid').val();
  $.ajax({
    url:'/user/'+text,
    type: 'delete'
  });
});

// /user/2
