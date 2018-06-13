$(function() {

  getFirstRealtime()
  getSecondRealtime()
  getTwoWeeks()
  getChart()
  // pagination()
  
  function getFirstRealtime(num) {
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
        // console.log('data :', data);

        // 최상단 현재 아이크래프트 주가 정보
        var lastDay = stockMain.lastday
        var low_price = stockMain.low_price
        var now_price = stockMain.now_price
        var start_price = stockMain.start_price
        var top_price = stockMain.top_price
        var volume = stockMain.volume
        var diff = stockMain.diff
        
        $('.subject-icraft-main').append("<span class='now_price number'>" + now_price + "</span>" +
          "<br>" + "전일대비 " + "<span class='arrow'>" + "</span>" + "<span class='diff'>" + diff + "</span>" 
        )
        $('.stock-header-tr1').append("<td width='15%' class='subject subject-icraft' scope='row'>" + "전일 " + "<span class='lastDay number'>" + lastDay + "</span>" + "</td>" +
        "<td width='15%' class='subject subject-icraft' scope='top'>" + "고가 " + "<span class='top_price number'>" + top_price + "</span>" + "</td>" +
        "<td width='15%' rowspan='2' class='subject subject-icraft volume' scope='row'>" + "거래량 " + "<span class='volume-text number'>" + volume + "</td>"
        )
        $('.stock-header-tr2').append("<td width='15%' class='subject subject-icraft' scope='row'>" + "시가 " + "<span class='start_price number'>" + start_price + "</span>" + "</td>" +
        "<td width='15%' class='subject subject-icraft' scope='row'>" + "저가 " + "<span class='low_price number'>" + low_price + "</span>" + "</td>"
        )

        if ( $(".lastday") > $(".now_price") ) {
          $(".now_price").css('color', 'blue')
        }
        
        if ( diff.toString().indexOf('-') !== -1 ) {
          $('.arrow').attr('class', 'arrow-d')
          $('.now_price').css('color', 'blue')
        } else {
          $('.arrow').attr('class', 'arrow-u')
        }

        $('.number').number(true)
        
      }, 
      error: function() {
        alert("failed");
      }
    }).responseText;
  }

  function getSecondRealtime(num) {
    // var num = '1'
    $.ajax({
      // url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/stock/realtime/1",
      url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/stock/realtime/" + num,
      async: true,
      type: "GET",
      dataType: "json",
      crossDomain: true,
      success: function(data) {
        var data = data
        var stockMain = data.data
        var stock = stockMain.each_stock
        var total = stock.length
        console.log('json_total :', total);

        // 페이지네이션
        var pageLength = Math.ceil( total / 10 );
        var pagination = document.getElementsByClassName("pagination-1")[0];
        
        for( var i = 1; i <= pageLength; i++ ){
          var pageLi = document.createElement("li");
          var pageAT = document.createElement("a");        
          $(pageLi).attr("class","page-item");   
          $(pageAT).attr("class","page-link");      
          // $(pageAT).attr("href", pageUrl[0] + "?page=" + i  + "#board");
          $(pageAT).append(i);   
          if(i == num){
            $(pageLi).addClass("active"); 
          }
          $(pageLi).append(pageAT);     
          $(pagination).append(pageLi);
          
          function makePageArrow(direction, num,pageLength){
            switch(direction) {
              case "left":          
                if( 0 < num && num < pageLength){              
                  var num = Number(num) -1;               
                  var pageLi = document.createElement("li");        
                  var pageLeftArrow = document.createElement("a");
                  $(pageLeftArrow).attr("href", pageUrl[0] + num + "#board")
                  var pageLeftArrowImg = document.createElement("img");
                  $(pageLeftArrowImg).attr("src", "img/icon-left-arrow.png");
                  $(pageLeftArrow).prepend(pageLeftArrowImg);
                  $(pageLi).append(pageLeftArrow);
                  $(pagination).prepend(pageLi);                 
                }                             
                break;          
              case "right":          
                if( num < pageLength ){
                  var num = Number(num) +1;                                         
                  var pageLi = document.createElement("li");                  
                  var pageRightArrow = document.createElement("a");
                  $(pageRightArrow).attr("href", pageUrl[0] + "?page=" + num + "#board")
                  var pageRightArrowImg = document.createElement("img");
                  $(pageRightArrowImg).attr("src", "img/icon-right-arrow.png");
                  $(pageRightArrow).append(pageRightArrowImg);
                  $(pageLi).append(pageRightArrow);          
                  $(pagination).append(pageLi); 
                }
                break;                          
            }
          }
          makePageArrow("left", num, pageLength);
          makePageArrow("right", num, pageLength);
        }

        console.log('pageLength :', pageLength);
        console.log('pagination :', pagination);

        for (var i = 0; i < stock.length; i++) {

          // 시간별 시세 테이블 바디
          var realtimeTbody = $(".stock-time")

          var el = stock[i];
          var dateTime = el.datetime.substr(el.datetime.length - 8)
          var dateTimeS = dateTime.substr(0,5) 
          var nego = el.nego
          var diff = el.diff
          var sell = el.sell
          var buy = el.buy
          var amountDiff = el.amount_diff

          var newTr = realtimeTbody.append("<tr class='tr-hover'>" + "<td>" + dateTimeS + "</td>" + 
            "<td>"+ "<span class='number'>" + nego + "</span>" + "</td>" + 
            "<td>"+ "<span class='diff-t'>" + "</span>" + diff + "</td>" +
            "<td>"+ "<span class='number'>" + sell + "</span>" + "</td>" +
            "<td>"+ "<span class='number'>" + buy + "</span>" + "</td>" + 
            "<td>"+ "<span class='number'>" + amountDiff + "</span>" + "</td>" + "</tr>"
          )

          if ( diff.toString().indexOf('-') !== -1 ) {
            $('.diff-t').attr('class', 'arrow-d')
          } else {
            $('.diff-t').attr('class', 'arrow-u')
          }
        }

        $('.number').number(true)        

      }, 
      error: function() {
        alert("failed");
      }
    }).responseText;
  }
  function getTwoWeeks() {
    // 2weeks
    $.ajax({
      url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/stock/2weeks/1",
      async: true,
      type: "GET",
      dataType: "json",
      crossDomain: true,
      success: function(data) {
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
          
          var newTr = realtimeTbody.append("<tr class='tr-hover'>" + "<td>" + date + "</td>" +  
            "<td>"+ "<span class='number'>" + price + "</span>" + "</td>" +
            "<td>"+ "<span class='diff-t'>" + "</span>" + diff + "</td>" +
            "<td>"+ "<span class='number'>" + start_price + "</span>" + "</td>" +
            "<td>"+ "<span class='number'>" + top_price + "</span>" + "</td>" + 
            "<td>"+ "<span class='number'>" + low_price + "</span>" + "</td>" +
            "<td>"+ "<span class='number'>" + volume + "</span>" + "</td>" + "</tr>"
          )

          $('.number').number(true)

          if ( diff.toString().indexOf('-') !== -1 ) {
            $('.diff-t').attr('class', 'arrow-d')
          } else {
            $('.diff-t').attr('class', 'arrow-u')
          }
        }
      }, 
      error: function() {
        alert("failed");
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
        
        var stockMain = data.data
        var stock = data.data.each_stock

        // 실시간 그래프 데이터 수집 배열
        var labelBox = [];
        var dataBox = [];

        for (var i = 0; i < stock.length; i++) {
          var el = stock[i];
          var dateTime = el.datetime.substr(el.datetime.length - 8)
          var dateTimeS = dateTime.substr(0,5) 
          var nego = el.nego
          var diff = el.diff
          var sell = el.sell
          var buy = el.buy
          var amountDiff = el.amount_diff

          labelBox.push(dateTimeS);
          dataBox.push(nego)

          var ctx = document.getElementById('myChart').getContext('2d');
          var chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labelBox,
              datasets: [{
                  label: "1일",
                  backgroundColor: 'rgba(244, 249, 255)',
                  borderColor: 'rgba(23, 74, 142)',
                  data: dataBox,
              }],
            },
            options: {}
          });
        }
        $('.number').number(true);        
      }, 
      error: function() {
        alert("failed");
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
          // console.log('data-m :', data.data);
          var data = data.data;
    
          var dateArray = []
          var priceArray = []
    
          for (var i = 0; i < data.length; i++) {
            var el = data[i];
            var date = el.date
            var price = el.price
    
            dateArray.push(date)
            priceArray.push(price)
    
            var ctx = document.getElementById('myChart-m').getContext('2d');
            var chart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: dateArray,
                datasets: [{
                    label: "1개월",
                    backgroundColor: 'rgb(244, 249, 255)',
                    borderColor: 'rgb(23, 74, 142)',
                    data: priceArray,
                }]
              },
              options: {}
            });
          }
          
        }, 
        error: function() {
          alert("failed");
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
          
            var ctx = document.getElementById('myChart-3m').getContext('2d');
            var chart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: dateArray,
                datasets: [{
                    label: "3개월",
                    backgroundColor: 'rgb(244, 249, 255)',
                    borderColor: 'rgb(23, 74, 142)',
                    data: priceArray,
                }]
              },
              options: {}
            });
          }
    
        }, 
        error: function() {
          alert("failed");
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
          
            var ctx = document.getElementById('myChart-y').getContext('2d');
            var chart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: dateArray,
                datasets: [{
                    label: "1",
                    backgroundColor: 'rgb(244, 249, 255)',
                    borderColor: 'rgb(23, 74, 142)',
                    data: priceArray,
                }],
                datasetStrokeWidth: 5,
                pointDotRadius : 8,
                borderWidth: 1
              },
              options: {}
            });
          }
        }, 
        error: function() {
          alert("failed");
        }
      }).responseText;
    })
  }
  function pagination() {
    // $('.page-item').each(function(index) {
    //   $(this).click(function(){
    //     getSecondRealtime(index);
    //   });
    // });
  }
});

