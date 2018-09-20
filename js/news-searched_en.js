$(function () {

  var box;    
  var pageUrl = window.location.href.split("?");
  // console.log('pageUrl :', pageUrl[0]);
  var pageNum = pageUrl[1].split("=")[1].replace(/[a-z,#,&,_]/g, "");      
  // console.log('pageNum :', pageNum);
    
  $.ajax({    
    type: "GET",
    url: 'https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/news?' + pageUrl,
    dataType: "JSON",
    error: function(){
      console.log('실패');
    },
    success: function(data){ 

      var box = data;
      // console.log('box :', box);  

      var board = $("#board .table tbody");
      var boardTitle = [];
      
      var tableT = document.createElement("table");
                   
      // DATA SUBTITLE
      for(var key in box.result[0]){
        boardTitle.push(key)
      }              
      // console.log('boardTitle :', boardTitle);

      // MAKE AND APPEND TR TD
      for(var j=0; j < box.result.length; j++){        
        var trT = document.createElement("tr");         
        for(var i=0; i < boardTitle.length; i++){
          if(i!==2){ //body 제외
            if(i==1){  
              var aT = document.createElement("a");   
              $(aT).attr("href", "news-post_en.html?page=" + i  + "&id=" + box.result[j][boardTitle[0]]);
              var tdT = document.createElement("td");                             
              $(aT).append(box.result[j][boardTitle[i]]);        
              $(tdT).append(aT);  
              $(trT).append(tdT);                                
            } else if(i==0 || i > 1){
              var tdT = document.createElement("td");     
              $(tdT).append(box.result[j][boardTitle[i]]);       
              $(trT).append(tdT);             
            } 
          }
        }      
        $(board).append(trT);
      }

      // MAKE PAGENATION
      var pageLength = Math.ceil((box.total)/10);      
      var pagination = document.getElementsByClassName("pagination")[0];
      // console.log('pagenation :', pagination);
      // console.log('pageLength :', pageLength);
      for(var i=1; i <= pageLength; i++){
        var pageLi = document.createElement("li");
        var pageAT = document.createElement("a");        
        $(pageLi).attr("class","page-item");   
        $(pageAT).attr("class","page-link");      
        $(pageAT).attr("href", pageUrl[0] + "?page=" + i  + "#board");
        $(pageAT).append(i);   
        if(i == pageNum){
          $(pageLi).addClass("active"); 
        }
        $(pageLi).append(pageAT);     
        $(pagination).append(pageLi);
      }      
      
      function makePageArrow(direction, pageNum,pageLength){
        switch(direction) {
          case "left":          
            if( 0 < pageNum && pageNum < pageLength){              
              var pageNum = Number(pageNum) -1;               
              var pageLi = document.createElement("li");        
              var pageLeftArrow = document.createElement("a");
              $(pageLeftArrow).attr("href", pageUrl[0] + pageNum + "#board")
              var pageLeftArrowImg = document.createElement("img");
              $(pageLeftArrowImg).attr("src", "img/icon-left-arrow.png");
              $(pageLeftArrow).prepend(pageLeftArrowImg);
              $(pageLi).append(pageLeftArrow);
              $(pagination).prepend(pageLi);                 
            }                             
            break;          
          case "right":          
            if( pageNum < pageLength ){
              var pageNum = Number(pageNum) +1;                                         
              var pageLi = document.createElement("li");                  
              var pageRightArrow = document.createElement("a");
              $(pageRightArrow).attr("href", pageUrl[0] + "?page=" + pageNum + "#board")
              var pageRightArrowImg = document.createElement("img");
              $(pageRightArrowImg).attr("src", "img/icon-right-arrow.png");
              $(pageRightArrow).append(pageRightArrowImg);
              $(pageLi).append(pageRightArrow);          
              $(pagination).append(pageLi); 
            }
            break;                          
        }
      }
      makePageArrow("left", pageNum, pageLength);
      makePageArrow("right", pageNum, pageLength);
    }
  })

});