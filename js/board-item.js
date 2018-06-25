$(function () {

  var box;
  var pageUrl = window.location.href.split("?");
  console.log('pageUrl[1] :', pageUrl[1]);
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
      console.log('box :', box);
      console.log('box.result.date :', box.result);
      // MAKE TITLE
      var title =  box.result.title;
      var available;
      if(box.result.available == true){
        available = '가능'
      } else if (box.result.available == false){
        available = '불가능'
      }
      var kinds;
      if(box.result.kinds == 'newcomer'){
        kinds = '신입'
      } else if (box.result.kinds == 'experienced'){
        kinds = '경력'
      }
      $(".article-title").append(title);
      // MAKE LOCATION
      var locationIT = document.createElement("i")
      $(locationIT).append(title);
      $(".location").append(locationIT);
      // MAKE TABLE
      var tableT = document.createElement("table");
      $(tableT).append(
      "<tr>"
        + "<td class='info-title'>지원기간</td>"
        + "<td>"+ box.result.date + "</td>"
        + "<td class='info-title'>지원구분</td>"
        + "<td>"+ kinds + "</td>"
        + "<td class='info-title'>첨부</td>"
        + "<td><a href='doc/아이크래프트_입사지원서_양식.doc'>입사지원서</a></td>"
        + "<td class='info-title'>지원가능여부</td>"
        + "<td>"+ available + "</td>"
      + "</tr>"
      + "<tr>"
        + "<td colspan='8'>"+ box.result.body +"</td>"
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