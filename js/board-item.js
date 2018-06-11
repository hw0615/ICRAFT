$(function () {

  var box;    
  var pageUrl = window.location.href.split("?");  
  var pageNum = window.location.href.split("?")[1].split("&")[0]
  $.ajax({    
    type: "GET",
    url: 'https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/recruit?' + pageUrl[1],
    dataType: "JSON",
    error: function(){
      console.log('실패');
    },
    success: function(data){ 

      var box = data;      
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
        + "<td class='info-title'>날짜</td>"
        + "<td>"+ box.result.date + "</td>"
        + "<td class='info-title'>첨부</td>"
        + "<td><a href='doc/아이크래프트_입사지원서_양식.doc'>입사지원서</a></td>"
        + "<td class='info-title'>지원가능여부</td>"
        + "<td>"+ box.result.available + "</td>"        
      + "</tr>"
      + "<tr>"
        + "<td colspan='6'>"+ box.result.body +"</td>"
      + "</tr>"
      )
      $(".tableArea").append(tableT)

      // MAKE LIST BUTTON

      var boardBtn = document.createElement("a")
      $(boardBtn).attr("href", "recruitment-board.html?"+ pageNum + "#board");
      console.log();
      $(boardBtn).attr("class", "board-btn");
      $(boardBtn).append("목록");
      $(".tableArea").append(boardBtn)
    }
  })

});