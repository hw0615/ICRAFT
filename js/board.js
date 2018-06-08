$(function () {

  var box;  
  
  $.ajax({    
    type: "GET",
    url:"https://13h8y48qei.execute-api.ap-northeast-2.amazonaws.com/test-stock/realtime",
    dataType: "JSON",
    error: function(){
      console.log('실패');
    },
    success: function(data){ 

      var box = data.data
      console.log('box :', box);  

      var board = $("#board .table tbody");
      var boardTitle = [];
      
      var tableT = document.createElement("table");
                   
      // each_stock subtitle
      for(var key in box.each_stock[0]){
        boardTitle.push(key)
      }              
      
      // make and append tr, td 
      for(var j=0; j < box.each_stock.length; j++){        
        var trT = document.createElement("tr");         
        for(var i=0; i < boardTitle.length; i++){
          if(i===0){  
            var aT = document.createElement("a");   
            $(aT).attr("href","#")  
            var tdT = document.createElement("td");                             
            $(aT).append(box.each_stock[j][boardTitle[i]]);        
            $(tdT).append(aT);  
            $(trT).append(tdT);                                
          } else if(i>0){
            var tdT = document.createElement("td");     
            $(tdT).append(box.each_stock[j][boardTitle[i]]);                              
            $(trT).append(tdT);  
          }
        }      
        $(board).append(trT);
      }

    }
  })

});