$(function () {

  var box;  

  $.ajax({    
    type: "GET",
    url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/news",
    dataType: "JSON",
    error: function(){
      console.log('실패');
    },
    success: function(data){ 
                       
      var box = data.results
      console.log('box :', box);  

      var board = $("#board .table tbody");
      var boardTitle = [];
      
      var tableT = document.createElement("table");
                   
      // each_stock subtitle
      for(var key in box.results[0]){
        boardTitle.push(key)
      }              
      console.log('boardTitle :', boardTitle);
      // make and append tr, td 
      for(var j=0; j < box.results.length; j++){        
        var trT = document.createElement("tr");         
        for(var i=0; i < boardTitle.length; i++){
          if(i===0){  
            var aT = document.createElement("a");   
            $(aT).attr("href","#")  
            var tdT = document.createElement("td");                             
            $(aT).append(box.results[j][boardTitle[i]]);        
            $(tdT).append(aT);  
            $(trT).append(tdT);                                
          } else if(i>0){
            var tdT = document.createElement("td");     
            $(tdT).append(box.results[j][boardTitle[i]]);                              
            $(trT).append(tdT);  
          }
        }      
        $(board).append(trT);
      }

    }
  })


  var searchBar = document.getElementsByClassName('search-bar')[0];
  var searchBtn = searchBar.getElementsByClassName('get-btn')[0];
  $(searchBar).submit(function(e){
    _config.api.invokeUrl
    var searchWord = searchBar.getElementsByTagName('input')[0];
    var formData = {
      'word' : $(searchWord).val()
    }    
    console.log('formData :', formData);
    $.ajax({  
      type: "POST",    
      url:"",
      data: formData,
      dataType: "JSON",
      encode: true
    })  
    .done(function(data){
      console.log('data :', data);
    })

    e.preventDefault();

  })  

  $(searchBtn).click(function(){    
    $(searchBar).submit()
  })  
  
})