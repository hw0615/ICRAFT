$(function() {
    
  function getDisclosure(index) {
    var index = Number(1)
    var box;    
    // var pageUrl = window.location.href.split("?");
    // var pageNum = pageUrl[1].split("=")[1].replace(/[a-z,#,&,_]/g, "");

    $.ajax({    
      type: "GET",
      url: 'https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/disclosure?page=' + index,
      dataType: "JSON",
      error: function(){
        console.log('실패');
      },
      beforeSend:function(){
        $('.loading').removeClass('display-none');
      },
      complete:function(){
        $('.loading').addClass('display-none');
      },
      success: function(data){ 

        var box = data.result
        
        // 페이지네이션 목록 출력
        var total = data.total  // 총 페이지 수
        // var dataPerPage = 20;
        var pageCount = 10;

        function paging(total, pageCount, currentPage) {

          console.log("currentPage-1 : " + currentPage);
        
          // var totalPage = Math.ceil(total/dataPerPage);    // 총 페이지 수
          var totalPage = Math.ceil( total / 10 );    // 총 페이지 수
          var pageGroup = Math.ceil( currentPage / pageCount );    // 페이지 그룹
          
          console.log("pageGroup-1 : " + pageGroup);
          
          var last = pageGroup * pageCount;    // 화면에 보여질 마지막 페이지 번호
          if(last > totalPage)
              last = totalPage;
          var first = last - ( last - 1 );    // 화면에 보여질 첫번째 페이지 번호
          // var first = last - (pageCount-1);    // 화면에 보여질 첫번째 페이지 번호
          var next = last + 1;
          var prev = first - 1;
          
          console.log("last-1 : " + last);
          console.log("first-1 : " + first);
          console.log("next-1 : " + next);
          console.log("prev-1 : " + prev);
  
          var html = "";

          if(prev > 0)
            html += "<li id='prev'> < </li> ";
          
          for( var i = first; i <= last; i++ ){
            html += "<li class='page-num' id=" + i + ">" + i + "</li> ";
          }
          
          if(last < totalPage)
            html += "<li id='next'> > </li>";
          
          $(".pagination").html(html);    // 페이지 목록 생성
          $(".pagination li#" + currentPage).css({
            "text-decoration":"none", 
            "color":"#FF8400", 
            "font-weight":"bold",
          });

          // 현재 페이지 표시                                   
          $(".pagination li").click(function(){
              
            var $item = $(this);
            var $id = $item.attr("id");
            var selectedPage = $item.text();
            index = parseInt($(this).text())
            console.log('index :', index);
            
            if($id == "next") {
              selectedPage = next; 
              index = parseInt(first) + 10
            }
            if($id == "prev") {
              selectedPage = prev;
              index = parseInt(last) - 10
            }
            $('.list').remove()

            $.ajax({
              url: 'https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/disclosure?page=' + index,
              async: true,
              type: "GET",
              dataType: "json",
              crossDomain: true,
              success: function(data) {
                console.log('data.result :', data.result);
                var data = data.result
                // var stockMain = data.data
                // var stock = stockMain.each_stock
        
                for (var j = 0; j < data.length; j++) {
                  var el = data[j];
                  var id = el.id;
                  // var date_id = el.date_id
                  var title = el.title;
                  var date = el.date;
                  var submitter = el.submitter;
                  var url = el.info_url;

                  // // 시간별 시세 테이블 바디
                  var Tbody = $(".table tbody")
                  // var realtimeTr = $(".realtime-1")

                  var newTr = Tbody.append(
                    "<tr class='list'>" + 
                    "<td>" + id + "</td>" + 
                    "<td>" + "<a href=" + url + " target=_blank "+" >" + title + "</a>" + "</td>" + 
                    "<td>" + date + "</td>" +
                    "<td>" + submitter + "</td>" +
                    "</tr>"
                  )
                }
              }, 
              beforeSend:function(){
                $('.loading').removeClass('display-none');
              },
              complete:function(){
                $('.loading').addClass('display-none');
              },
              error: function() {
                console.log("failed");
              }
            }).responseText;
            paging(total, pageCount, selectedPage);
        });

        }

        for (var j = 0; j < box.length; j++) {
          var el = box[j];
          var id = el.id;
          // var date_id = el.date_id
          var title = el.title;
          var date = el.date;
          var submitter = el.submitter;
          var url = el.info_url;

          // // 시간별 시세 테이블 바디
          var Tbody = $(".table tbody")
          // var realtimeTr = $(".realtime-1")

          var newTr = Tbody.append(
            "<tr class='list'>" + 
            "<td>" + id + "</td>" + 
            "<td>" + "<a href=" + url + " target=_blank "+" >" + title + "</a>" + "</td>" + 
            "<td>" + date + "</td>" +
            "<td>" + submitter + "</td>" +
            "</tr>"
          )
        }
        // // DATA SUBTITLE
        // for(var key in box.result[0]){
        //   boardTitle.push(key)
        // }              
        // console.log('boardTitle :', boardTitle);
        // console.log('boardTitle[4] :', box.result[0][boardTitle[4]]);

        // // MAKE AND APPEND TR TD
        // for(var j=0; j < box.result.length; j++){        
        //   var trT = document.createElement("tr");      
        //   $(trT).attr('class', 'list')   
        //   for(var i=0; i < boardTitle.length; i++){
        //     if(i !== 4){
        //       if(i === 1){  
        //         var aT = document.createElement("a");               
        //         $(aT).attr("href", box.result[j][boardTitle[4]]);
        //         $(aT).attr("target", '_blank');
        //         var tdT = document.createElement("td");                             
        //         $(aT).append(box.result[j][boardTitle[i]]);        
        //         $(tdT).append(aT);  
        //         $(trT).append(tdT);                                
        //       } else if(i === 0 || i > 1){
        //         var tdT = document.createElement("td");     
        //         $(tdT).append(box.result[j][boardTitle[i]]);       
        //         $(trT).append(tdT);             
        //       } 
        //     }
        //   }      
        //   $(board).append(trT);
        // }

        $("document").ready(function(){        
          paging(total, pageCount, 1);
        });
      }
    })
  }
  getDisclosure()
});