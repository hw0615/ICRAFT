  
  $.ajax({    
    type: "GET",
    url: 'https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/news/main',
    dataType: "JSON",
    success: function(data){ 
        var box = data
        console.log('box :', box);        
    },
    error: function(){
      console.log('실패');
    }
  })
