$(function() {

  getFirstRealtime()
  getSecondRealtime()
  getTwoWeeksPages()
  getChart()
  
  function getFirstRealtime() {
    $.ajax({
      url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/stock/realtime",
      async: true,
      type: "GET",
      dataType: "json",
      crossDomain: true,
      success: function(data) {
        var data = data
        var stockMain = data.data
        var stock = stockMain.each_stock

        // 최상단 현재 아이크래프트 주가 정보
        var lastDay = stockMain.lastday.toString()
        var low_price = stockMain.low_price
        var now_price = stockMain.now_price.toString()
        var start_price = stockMain.start_price
        var top_price = stockMain.top_price
        var volume = stockMain.volume
        var diff = stockMain.diff
        
        $('.subject-icraft-main').append("<span class='now_price number'>" + now_price + "</span>" +
          "<br>" + "Compare to the day before " + "<span class='arrow'>" + "</span>" + "<span class='diff'>" + diff + "</span>" 
        )
        $('.stock-header-tr1').append("<td width='15%' class='subject subject-icraft' scope='row'>" + "Price, Day before " + "<span class='lastDay number'>" + lastDay + "</span>" + "</td>" +
        "<td width='15%' class='subject subject-icraft' scope='top'>" + "High " + "<span class='top_price number'>" + top_price + "</span>" + "</td>" +
        "<td width='15%' rowspan='2' class='subject subject-icraft volume' scope='row'>" + "Total Volume (Shares) " + "<span class='volume-text number'>" + volume + "</td>"
        )
        $('.stock-header-tr2').append("<td width='15%' class='subject subject-icraft' scope='row'>" + "Open " + "<span class='start_price number'>" + start_price + "</span>" + "</td>" +
        "<td width='15%' class='subject subject-icraft' scope='row'>" + "Low " + "<span class='low_price number'>" + low_price + "</span>" + "</td>"
        )
        
        if ( lastDay > now_price ) {
          $(".now_price").css('color', 'blue')
        } else if ( lastDay === now_price ) {
          $(".now_price").css('color', '#333')
          $('.arrow').removeClass('arrow-u')
        }
        
        if ( diff.toString().indexOf('-') !== -1 ) {
          $('.arrow').attr('class', 'arrow-d')
          $('.now_price').css('color', 'blue')
          $('.diff').css('color', 'blue')
        } else {
          $('.arrow').attr('class', 'arrow-u')
          $('.now_price').css('color', 'red')
          $('.diff').css('color', 'red')
        }

        $('.number').number(true)
      }, 
      error: function() {
        console.log("failed");
      }
    }).responseText;
  }
  function getSecondRealtime() {
    var index = Number(1)
    $.ajax({
      url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/stock/realtime/1",
      async: true,
      type: "GET",
      dataType: "json",
      crossDomain: true,
      success: function(data) {
        var data = data
        var stockMain = data.data
        var stock = stockMain.each_stock

        // 페이지네이션 목록 출력
        var total = data.total  // 총 페이지 수
        // var dataPerPage = 20;
        var pageCount = 10;
        var pageLength = Math.ceil( total / 10 );
        var pagination = document.getElementsByClassName("pagination")[0];
        
        console.log('total :', total);

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
              
              if($id == "next") {
                selectedPage = next; 
                index = parseInt(first) + 10
              }
              if($id == "prev") {
                selectedPage = prev;
                index = parseInt(last) - 10
              }
              $('.realtime-1').remove()

              $.ajax({
                url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/stock/realtime/" + index,
                async: true,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                success: function(data) {
                  var data = data
                  var stockMain = data.data
                  var stock = stockMain.each_stock
          
                  for (var j = 0; j < stock.length; j++) {
                    var el = stock[j];
                    var dateTime = el.datetime.substr(el.datetime.length - 8)
                    var dateTimeS = dateTime.substr(0,5) 
                    var nego = el.nego
                    var diff = el.diff.toString()
                    var sell = el.sell
                    var buy = el.buy
                    var amountDiff = el.amount_diff

                    // 시간별 시세 테이블 바디
                    var realtimeTbody = $(".stock-time")
                    var realtimeTr = $(".realtime-1")

                    var newTr = realtimeTbody.append(
                      "<tr class='realtime-1'>" + 
                      "<td>"+ dateTimeS + "</td>" + 
                      "<td>"+ "<span class='number'>" + nego + "</span>" + "</td>" + 
                      "<td class='diff-num'>"+ "<span class='diff-t'>" + "</span>" + diff + "</td>" +
                      "<td>"+ "<span class='number'>" + sell + "</span>" + "</td>" +
                      "<td>"+ "<span class='number'>" + buy + "</span>" + "</td>" + 
                      "<td>"+ "<span class='number'>" + amountDiff + "</span>" + "</td>" + 
                      "</tr>"
                    )

                    if ( diff.toString().indexOf('-') !== -1 ) {
                      $('.diff-t').attr('class', 'arrow-d')
                      // $('.diff-num').css('color', 'blue')
                    } else {
                      $('.diff-t').attr('class', 'arrow-u')
                      // $('.diff-num').css('color', 'red')
                    }
                  }
                  $('.number').number(true)
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

        for (var j = 0; j < stock.length; j++) {
          var el = stock[j];
          var dateTime = el.datetime.substr(el.datetime.length - 8)
          var dateTimeS = dateTime.substr(0,5) 
          var nego = el.nego
          var diff = el.diff.toString()
          var sell = el.sell
          var buy = el.buy
          var amountDiff = el.amount_diff

          console.log('diff :', diff);

          // 시간별 시세 테이블 바디
          var realtimeTbody = $(".stock-time")
          var realtimeTr = $(".realtime-1")

          var newTr = realtimeTbody.append(
            "<tr class='realtime-1'>" + 
            "<td>"+ dateTimeS + "</td>" + 
            "<td>"+ "<span class='number'>" + nego + "</span>" + "</td>" + 
            "<td class='diff-num'>"+ "<span class='diff-t'>" + "</span>" + diff + "</td>" +
            "<td>"+ "<span class='number'>" + sell + "</span>" + "</td>" +
            "<td>"+ "<span class='number'>" + buy + "</span>" + "</td>" + 
            "<td>"+ "<span class='number'>" + amountDiff + "</span>" + "</td>" + 
            "</tr>"
          )

          if ( diff.toString().indexOf('-') !== -1 ) {
            $('.diff-t').attr('class', 'arrow-d')
            // $('.diff-num').css('color', 'blue')
          } else {
            $('.diff-t').attr('class', 'arrow-u')
            // $('.diff-num').css('color', 'red')
          }
        }
        $("document").ready(function(){        
          paging(total, pageCount, 1);
        });
        $('.number').number(true);        
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
  }
  function getTwoWeeksPages() {
    var index = Number(1)
    $.ajax({
      url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/stock/2weeks/1",
      async: true,
      type: "GET",
      dataType: "json",
      crossDomain: true,
      success: function(data) {
        var twoWeeksData = data
        var twoWeeks = data.data
        
        // 페이지네이션 목록 출력
        var total = data.total  // 총 페이지 수
        var pageCount = 10;
        var pageLength = Math.ceil( total / 10 );
        var pagination = document.getElementsByClassName("pagination-2")[0];
        
        function paging(total, pageCount, currentPage) {

          console.log("currentPage : " + currentPage);
        
          // var totalPage = Math.ceil(total/dataPerPage);    // 총 페이지 수
          var totalPage = Math.ceil( total / 10 );    // 총 페이지 수
          var pageGroup = Math.ceil( currentPage / pageCount );    // 페이지 그룹
          
          console.log("pageGroup : " + pageGroup);
          
          var last = pageGroup * pageCount;    // 화면에 보여질 마지막 페이지 번호
          if(last > totalPage)
              last = totalPage;
          var first = last - (pageCount-1);    // 화면에 보여질 첫번째 페이지 번호
          var next = last+1;
          var prev = first-1;
          
          console.log("last : " + last);
          console.log("first : " + first);
          console.log("next : " + next);
          console.log("prev : " + prev);
  
          
          var html = "";
          
          if(prev > 0)
              html += "<li id='prev'> < </li> ";
          
          for( var i = first; i <= last; i++ ){
              html += "<li class='page-num' id=" + i + ">" + i + "</li> ";
          }
          
          if(last < totalPage)
              html += "<li id='next'> > </li>";
          
          $(".pagination-2").html(html);    // 페이지 목록 생성
          console.log('$(".pagination2 li#" + currentPage) :', $(".pagination2 li#" + currentPage));
          $(".pagination-2 li#" + currentPage).css({
          // $(".pagination-2 li#" + currentPage).css({
            "text-decoration":"none", 
            "color":"#FF8400", 
            "font-weight":"bold",
            // "cursor" : "not-allowed"
          });

          // 현재 페이지 표시                                   
          $(".pagination-2 li").click(function(){
              
              var $item = $(this);
              var $id = $item.attr("id");
              var selectedPage = $item.text();
              index = parseInt($(this).text())
              
              if($id == "next") {
                selectedPage = next; 
                index = parseInt(first) + 10
              }
              if($id == "prev") {
                selectedPage = prev;
                index = parseInt(last) - 10
              }              
              $('.realtime-2').remove()

              $.ajax({
                url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/stock/2weeks/" + index,
                async: true,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                success: function(data) {
                  var twoWeeksData = data
                  var twoWeeks = data.data
                  console.log('twoWeeks :', twoWeeks);
          
                  for (var i = 0; i < twoWeeks.length; i++) {
                    var el = twoWeeks[i];
                    var date = el.date
                    var diff = el.diff
                    var low_price = el.low_price
                    var price = el.price
                    var start_price = el.start_price
                    var top_price = el.top_price
                    var volume = el.volume
          
                    var realtimeTbody = $(".stock-time2")
                    // var realtimeTr = $(".realtime-2")
                    
                    var newTr = realtimeTbody.append(
                      "<tr class='realtime-2'>" + "<td>" + date + "</td>" +  
                      "<td>"+ "<span class='number'>" + price + "</span>" + "</td>" +
                      "<td>"+ "<span class='diff-t'>" + "</span>" + diff + "</td>" +
                      "<td>"+ "<span class='number'>" + start_price + "</span>" + "</td>" +
                      "<td>"+ "<span class='number'>" + top_price + "</span>" + "</td>" + 
                      "<td>"+ "<span class='number'>" + low_price + "</span>" + "</td>" +
                      "<td>"+ "<span class='number'>" + volume + "</span>" + "</td>" + 
                      "</tr>"
                    )
                    if ( diff.toString().indexOf('-') !== -1 ) {
                      $('.diff-t').attr('class', 'arrow-d')
                    } else {
                      $('.diff-t').attr('class', 'arrow-u')
                    }
                  }
                  $('.number').number(true)
                }, 
                beforeSend:function(){
                  $('.loading-2').removeClass('display-none');
                },
                complete:function(){
                  $('.loading-2').addClass('display-none');
                },
                error: function() {
                  console.log("failed");
                }
              }).responseText;
              paging(total, pageCount, selectedPage);
          });
        }

        for (var i = 0; i < twoWeeks.length; i++) {
          var el = twoWeeks[i];

          var date = el.date
          var diff = el.diff
          var low_price = el.low_price
          var price = el.price
          var start_price = el.start_price
          var top_price = el.top_price
          var volume = el.volume

          var realtimeTbody = $(".stock-time2")
          var realtimeTr = $(".realtime-2")
          
          var newTr = realtimeTbody.append(
            "<tr class='realtime-2'>" + "<td>" + date + "</td>" +  
            "<td>"+ "<span class='number'>" + price + "</span>" + "</td>" +
            "<td>"+ "<span class='diff-t'>" + "</span>" + diff + "</td>" +
            "<td>"+ "<span class='number'>" + start_price + "</span>" + "</td>" +
            "<td>"+ "<span class='number'>" + top_price + "</span>" + "</td>" + 
            "<td>"+ "<span class='number'>" + low_price + "</span>" + "</td>" +
            "<td>"+ "<span class='number'>" + volume + "</span>" + "</td>" + 
            "</tr>"
          )
          if ( diff.toString().indexOf('-') !== -1 ) {
            $('.diff-t').attr('class', 'arrow-d')
          } else {
            $('.diff-t').attr('class', 'arrow-u')
          }
        }
  
        $("document").ready(function(){        
          paging(total, pageCount, 1);
        });
      }, 
      error: function() {
        console.log("failed");
      }
    }).responseText;
  }
  function getChart() {
    $.ajax({
      url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/stock/realtime",
      async: true,
      type: "GET",
      dataType: "json",
      crossDomain: true,
      success: function(data) {
        console.log('data-for-chart1 :', data);
        var stockMain = data.data
        var stock = stockMain.each_stock
        var negoEach = stockMain.each_nego

        // 실시간 그래프 데이터 수집 배열
        var labelBox = [];
        var dataBox = [];

        for (var k = 0; k < negoEach.length; k++) {
          var el = negoEach[k];
          dataBox.push(el.toString())
        }

        for (var i = 0; i < stock.length; i++) {
          var el = stock[i];
          var dateTime = el.datetime.substr(el.datetime.length - 8)
          var dateTimeS = dateTime.substr(0,5) 
          var nego = el.nego.toString()
          var diff = el.diff
          var sell = el.sell
          var buy = el.buy
          var amountDiff = el.amount_diff
            
          labelBox.push(dateTimeS);
          labelBox.reverse().sort()
        }

        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labelBox,
            datasets: [{
              label: "Day",
              backgroundColor: 'rgba(244, 249, 255)',
              borderColor: 'rgba(23, 74, 142)',
              data: dataBox
            }],
          },
          options: {
            animation: {
              duration: 0, // general animation time
            },
            hover: {
              animationDuration: 0, // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0, // animation duration after a resize
          }
        });
        $('.number').number(true);        
      }, 
      beforeSend:function(){
        $('.loading-chart').removeClass('display-none');
      },
      complete:function(){
        $('.loading-chart').addClass('display-none');
      },
      error: function() {
        console.log("failed");
      }
    }).responseText;

    $('.number').number(true);

    $('#chart1').click(function() {
      $('#myChart').css('display', 'block')
      $('#myChart-m').css('display', 'none')
      $('#myChart-3m').css('display', 'none')
      $('#myChart-y').css('display', 'none')
    })
    $('#chart2').click(function() {
      $('#myChart').css('display', 'none')
      $('#myChart-m').css('display', 'block')
      $('#myChart-3m').css('display', 'none')
      $('#myChart-y').css('display', 'none')
      $.ajax({
        url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/stock/month",
        async: true,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function(data) {
          var data = data.data;
    
          var dateArray = []
          var priceArray = []
    
          for (var i = 0; i < data.length; i++) {
            var el = data[i];
            var date = el.date
            var price = el.price
    
            dateArray.push(date)
            priceArray.push(price)
          }

          var ctx = document.getElementById('myChart-m').getContext('2d');
          var chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: dateArray,
              datasets: [{
                label: "One Month",
                backgroundColor: 'rgb(244, 249, 255)',
                borderColor: 'rgb(23, 74, 142)',
                data: priceArray,
              }]
            },
            options: {
              animation: {
                duration: 0, // general animation time
              },
              hover: {
                animationDuration: 0, // duration of animations when hovering an item
              },
              responsiveAnimationDuration: 0, // animation duration after a resize
            }
          });
          
        }, 
        beforeSend:function(){
          $('.loading-chart').removeClass('display-none');
        },
        complete:function(){
          $('.loading-chart').addClass('display-none');
        },
        error: function() {
          console.log("failed");
        }
      }).responseText;
    })
    $('#chart3').click(function() {
      $('#myChart').css('display', 'none')
      $('#myChart-m').css('display', 'none')
      $('#myChart-3m').css('display', 'block')
      $('#myChart-y').css('display', 'none')
      $.ajax({
        url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/stock/3months",
        async: true,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function(data) {
          // console.log('data-3m :', data.data);
          var data = data.data
    
          var dateArray = []
          var priceArray = []
    
          for (var i = 0; i < data.length; i++) {
            var el = data[i];
            var date = el.date
            var price = el.price
    
            dateArray.push(date)
            priceArray.push(price)
          
          }
          var ctx = document.getElementById('myChart-3m').getContext('2d');
          var chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: dateArray,
              datasets: [{
                label: "3 Months",
                backgroundColor: 'rgb(244, 249, 255)',
                borderColor: 'rgb(23, 74, 142)',
                data: priceArray,
              }]
            },
            options: {
              animation: {
                duration: 0, // general animation time
              },
              hover: {
                animationDuration: 0, // duration of animations when hovering an item
              },
              responsiveAnimationDuration: 0, // animation duration after a resize
            }
          });
    
        }, 
        beforeSend:function(){
          $('.loading-chart').removeClass('display-none');
        },
        complete:function(){
          $('.loading-chart').addClass('display-none');
        },
        error: function() {
          console.log("failed");
        }
      }).responseText;
    })
    $('#chart4').click(function() {
      $('#myChart').css('display', 'none')
      $('#myChart-m').css('display', 'none')
      $('#myChart-3m').css('display', 'none')
      $('#myChart-y').css('display', 'block')
      $.ajax({
        url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/stock/year",
        async: true,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function(data) {
          // console.log('data-y :', data.data);
          var data = data.data
    
          var dateArray = []
          var priceArray = []
    
          for (var i = 0; i < data.length; i++) {
            var el = data[i];
            var date = el.date
            var price = el.price
    
            dateArray.push(date)
            priceArray.push(price)
          
          }
          var ctx = document.getElementById('myChart-y').getContext('2d');
          var chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: dateArray,
              datasets: [{
                label: "Year",
                backgroundColor: 'rgb(244, 249, 255)',
                borderColor: 'rgb(23, 74, 142)',
                data: priceArray,
              }],
              datasetStrokeWidth: 5,
              pointDotRadius : 8,
              borderWidth: 1
            },
            options: {
              animation: {
                duration: 0, // general animation time
              },
              hover: {
                animationDuration: 0, // duration of animations when hovering an item
              },
              responsiveAnimationDuration: 0, // animation duration after a resize
            }
          });
        }, 
        beforeSend:function(){
          $('.loading-chart').removeClass('display-none');
        },
        complete:function(){
          $('.loading-chart').addClass('display-none');
        },
        error: function() {
          console.log("failed");
        }
      }).responseText;
    })
  }
});

