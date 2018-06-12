$(function() {

  getJson()
  getChart()
    
  function getJson() {
    $.ajax({
      url: "https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/stock/realtime/1",
      async: true,
      type: "GET",
      dataType: "json",
      crossDomain: true,
      success: function(data) {
        var stockMain = data.data
        var stock = data.data.each_stock
        console.log('stockMain :', stockMain);

        // 최상단 현재 아이크래프트 주가 정보
        var lastDay = stockMain.lastday
        var low_price = stockMain.low_price
        var now_price = stockMain.now_price
        var start_price = stockMain.start_price
        var top_price = stockMain.top_price
        var volume = stockMain.volume
        var diff = stockMain.diff

        // 실시간 그래프 데이터 수집 배열
        var labelBox = [];
        var dataBox = [];

        // 시간별 시세 테이블 바디
        var tbodySt = $(".stock-time")
        
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
          // $('.diff').css('color', 'blue')
        } else {
          $('.arrow').attr('class', 'arrow-u')
        }

        $('.number').number(true)
        
        for (var i = 0; i < stock.length; i++) {
          var el = stock[i];
          console.log('el :', el);
          var dateTime = el.datetime.substr(el.datetime.length - 8)
          var dateTimeS = dateTime.substr(0,5) 
          var nego = el.nego
          var diff = el.diff
          var sell = el.sell
          var buy = el.buy
          var amountDiff = el.amount_diff

          // labelBox.push(dateTimeS);
          // dataBox.push(nego)

          var newTr = tbodySt.append("<tr class='tr-hover'>" + "<td>" + dateTimeS + "</td>" + 
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
        // var ctx = document.getElementById('myChart').getContext('2d');
        // var chart = new Chart(ctx, {
        //   type: 'line',
        //   data: {
        //       labels: labelBox,
        //       datasets: [{
        //           label: "1일",
        //           backgroundColor: 'rgba(244, 249, 255)',
        //           borderColor: 'rgba(23, 74, 142)',
        //           data: dataBox,
        //       }],
        //   },
        //   options: {}
        // });
        // $('.number').number(true);        
      }, 
      error: function() {
        alert("failed");
      }
    }).responseText;

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

          var tbodySt = $(".stock-time2")
          
          var newTr = tbodySt.append("<tr class='tr-hover'>" + "<td>" + date + "</td>" +  
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
          
          // console.log('diff.toString().length :', diff.toString().length);
          // if ( diff.toString().length === 1) {
          //   $('.arrow-u').removeClass()
          // }

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

    if ( $('#myChart').hasClass('active') === true) {
      // $('#myChart-m').css('display', 'none')
      // $('#myChart-3m').css('display', 'none')   
      // $('#myChart-y').css('display', 'none')   
    } 
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
          console.log('data-m :', data.data);
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
          console.log('data-3m :', data.data);
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
          console.log('data-y :', data.data);
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
});

