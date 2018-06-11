$(function () {

  var box;    
  var pageUrl = window.location.href.split("?");  
  // console.log('object :', pageUrl[1]);  
  var pageNum = pageUrl[1].split("=")[1].replace(/[a-z,#,&,_]/g, "");    
  
  $.ajax({    
    type: "GET",
    url: 'https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/news?' + pageUrl[1],
    dataType: "JSON",
    error: function(){
      console.log('실패');
    },
    success: function(data){ 

      var box = data;      
      // console.log('box :', box);
      // MAKE TITLE 
      var title =  box.result.title;          
      $(".article-title").append(title);
      // MAKE LOCATION
      var locationIT = document.createElement("i")
      $(locationIT).append(title);
      $(".location").append(locationIT);
      // MAKE TABLE                
      var tableT = document.createElement("table");
      $(tableT).append(
      "<tr>"
        + "<td class='info-title'>제목</td>"
        + "<td>"+ box.result.title + "</td>"
        + "<td class='info-title'>날짜</td>"
        + "<td>"+ box.result.date + "</td>"        
        + "<td class='info-title'>조회수</td>"
        + "<td>"+ box.result.count + "</td>"        
      + "</tr>"
      + "<tr>"
        + "<td colspan='6' style='padding: 20px !important'>"+ box.result.body +"</td>"
      + "</tr>"
      )
      $(".tableArea").append(tableT)

      // MAKE LIST BUTTON

      var boardBtn = document.createElement("a")
      $(boardBtn).attr("href", "news.html?page="+ pageNum + "#board");      
      $(boardBtn).attr("class", "board-btn");
      $(boardBtn).append("목록");
      $(".tableArea").append(boardBtn)
      
    }
  })

});