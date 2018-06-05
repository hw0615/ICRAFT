$(function () {
  $.ajax({
    
    type: "GET",
    url:"",
    dataType: "JSON",
    error: function(){
      console.log('실패');
    },
    success: function(data){
      console.log('data :', data);
      for(var datas in data){
        
      }
    }
  })
});