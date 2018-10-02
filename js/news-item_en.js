$(function () {

  var box;    
  var pageUrl = window.location.href.split("?");  
  // console.log('pageUrl :', pageUrl);
  var pageNum = pageUrl[1].split("=")[1].replace(/[a-z,#,&,_]/g, "");    
  // console.log('oageNum :', pageNum);
  $.ajax({    
    type: "GET",
    url: _config.api.invokeUrl+ '/' + 'news?' + pageUrl[1],
    dataType: "JSON",
    error: function(){
      console.log('실패');
    },
    success: function(data){ 

      var box = data;      
      console.log('box :', box);
      console.log('box.result :', box.result[0]);
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
        + "<td class='info-title'>Title</td>"
        + "<td>"+ box.result.title + "</td>"
        + "<td class='info-title'>Date</td>"
        + "<td>"+ box.result.date + "</td>"        
        + "<td class='info-title'>Views</td>"
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
      $(boardBtn).append("List");
      $(".tableArea").append(boardBtn)
      
    }
  })

});