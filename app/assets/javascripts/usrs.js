$(function(){
  $('#new_group').on('keyup', function(e) {
    e.preventDefault();
    let input = $("#group_name").val();
    console.log(input);
  });
});