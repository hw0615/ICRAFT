/*global Cognito _config AmazonCognitoIdentity AWSCognito*/

var Cognito = window.Cognito || {};

(function rideScopeWrapper($) {
  // check auth
  var authToken;
  Cognito.authToken.then(function setAuthToken(token) {
    if (token) {
      authToken = token;
    } else {
      window.location.href = 'signin.html';
    }
  }).catch(function handleTokenError(error) {
    alert(error);
    window.location.href = 'signin.html';
  });

  // tab btn
  var tabBtn = $(".tab-btn a");
  var tableLi = $(".table-tab li");
  var paginationLi = $(".pagination-tab li");

  var page = getUrlParam('page');
  var cate = 'recruit';


  $(tabBtn[0]).on('click', function (event) {
    event.preventDefault();
    $(tableLi).removeClass("active")
    $(tableLi[0]).addClass("active")

    var dataLength = $(".active .table tr").length;
    if (dataLength < 3) {
      getTabArticles(cate, page)
    }
    printPagination();
    pagenationOnOff(0);
  })
  $(tabBtn[0]).click();
  $(tabBtn[1]).on('click', function (event) {
    event.preventDefault();
    $(tableLi).removeClass("active")
    $(tableLi[1]).addClass("active")
    var page = getUrlParam('page');
    var cate = 'news';
    var dataLength = $(".active .table tr").length;

    if (dataLength < 3) {
      getTabArticles(cate, page)
    }
    printPagination();
    pagenationOnOff(1);
  })
  $(tabBtn[2]).on('click', function (event) {
    event.preventDefault();
    $(tableLi).removeClass("active")
    $(tableLi[2]).addClass("active")
    var page = getUrlParam('page');
    var cate = 'disclosure';
    var dataLength = $(".active .table tr").length;

    if (dataLength < 3) {
      getTabArticles(cate, page)
    }
    printPagination();
    pagenationOnOff(2);
  })

  $(paginationLi).addClass("active")

  function pagenationOnOff(num) {
    $(paginationLi).css('display', 'none')
    $(paginationLi[num]).css('display', 'block')
    $(tabBtn).removeClass('active')
    $(tabBtn[num]).addClass('active')
  }

  function getTabArticles(cate, page) {
    $.ajax({
      method: 'GET',
      url: _config.api.invokeUrl + '/' + cate + '?page=' + page,
      headers: {
        Authorization: authToken
      },
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        getTabAllData(cate, data);
      },
      error: function ajaxError(jqXHR, textStatus, errorThrown) {
        console.error('Error requesting news: ', textStatus, ', Details: ', errorThrown);
        console.error('Response: ', jqXHR.responseText);
        alert('An error occured when requesting your news:\n' + jqXHR.responseText);
      }
    });
  }

  function getTabAllData(cate, result) {
    for (i = 0; i < result['result'].length; i++) {
      tabUpdate(cate, i, result['result'][i])
    }
  }

  function tabUpdate(cate, i, text) {
    switch (cate) {
      case "recruit":
        var available;
        if (text['available'] == true) {
          available = "가능"
        } else {
          available = "불가능"
        }
        $('#recruit tbody').append($(
          '<tr>\n <td>' + text['id'] + '</td>\n <td><a href="pit-in.html?recruit' + '&id=' + text['id'] + '">' + text['title'] + '</a></td>\n <td>' + text['date'] + '</td>\n <td>' + text['kinds'] + '</td>\n <td>' + available + '</td>\n <td>' + text['count'] + '</td>\n <td><button class="get-btn" onclick="deleteArticle(\'recruit\',' + text['id'] + ')" style="margin-top:0; width: 50px">\uC0AD\uC81C</button></td>\n </tr>'
        ));
        break;
      case "news":
        $('#news tbody').append($(
          '<tr>\n <td>' + text['id'] + '</td>\n <td><a href="pit-in.html?news' + '&id=' + text['id'] + '">' + text['title'] + '</a></td>\n <td>' + text['date'] + '</td>\n <td>' + text['count'] + '</td>\n <td><button class="get-btn" type="button" onclick="deleteArticle(\'news\',' + text['id'] + ')" style="margin-top:0; width: 50px">\uC0AD\uC81C</button></td>\n </tr>'
        ));
        break;
      case "disclosure":
        $('#disclosure tbody').append($(
          '<tr>\n <td>' + text['id'] + '</td>\n <td><a href="pit-in.html?news' + '&id=' + text['id'] + '">' + text['title'] + '</a></td>\n <td>' + text['date'] + '</td>\n <td>' + text['submitter'] +  '</td>\n <td><button class="get-btn" type="button" onclick="deleteArticle(\'disclosure\',' + text['id'] + ')" style="margin-top:0; width: 50px">\uC0AD\uC81C</button></td>\n </tr>'
        ));
        break;
    }
  }
  // pagenation
  function printPagination() {
    var pagenationkey = "recruit";
    switch (pagenationkey) {
      case "recruit":
        $.ajax({
          method: 'GET',
          url: _config.api.invokeUrl + '/' + pagenationkey,
          contentType: 'application/json; charset=utf-8',
          success: function (data) {
            var targetPage = 0;
            makePagenation(data, 'recruit', targetPage)
          },
          error: function ajaxError(jqXHR, textStatus, errorThrown) {
            console.error('Error requesting news: ', textStatus, ', Details: ', errorThrown);
            console.error('Response: ', jqXHR.responseText);
            alert('An error occured when requesting your news:\n' + jqXHR.responseText);
          }
        });
        pagenationkey = "news";
      case "news":
        $.ajax({
          method: 'GET',
          url: _config.api.invokeUrl + '/' + pagenationkey,
          contentType: 'application/json; charset=utf-8',
          success: function (data) {
            var targetPage = 1;
            makePagenation(data, 'news', targetPage)
          },
          error: function ajaxError(jqXHR, textStatus, errorThrown) {
            console.error('Error requesting news: ', textStatus, ', Details: ', errorThrown);
            console.error('Response: ', jqXHR.responseText);
            alert('An error occured when requesting your news:\n' + jqXHR.responseText);
          }
        });
        pagenationkey = "disclosure";
      case "disclosure":
        $.ajax({
          method: 'GET',
          url: _config.api.invokeUrl + '/' + pagenationkey,
          contentType: 'application/json; charset=utf-8',
          success: function (data) {
            var targetPage = 2;
            makePagenation(data, 'disclosure', targetPage)
          },
          error: function ajaxError(jqXHR, textStatus, errorThrown) {
            console.error('Error requesting news: ', textStatus, ', Details: ', errorThrown);
            console.error('Response: ', jqXHR.responseText);
            alert('An error occured when requesting your news:\n' + jqXHR.responseText);
          }
        });
        break;
    }
  }

  function makePagenation(data, cate, targetPage) {
    var url = window.location.href;
    var checkUrlKey = url.split("/").slice(-1)[0];
    var cate = cate;
      console.log('cate :', cate);
    if (checkUrlKey !== 'pit-in.html') {
      var paginationTab = document.getElementsByClassName("pagination-tab")[0]
      var pagination = paginationTab.getElementsByClassName("pagination")[targetPage];
      var pageLength = Math.ceil((data.total) / 10);
      var pageNum = url.split("=")[1].replace(/[a-z,#,&,_]/g, "");
      $(pagination).empty();

      for (var i = 1; i <= pageLength; i++) {
        var pageLi = document.createElement("li");
        var pageAT = document.createElement("a");
        $(pageLi).attr("class", "page-item");
        $(pageAT).attr("class", "page-link");
        // $(pageAT).attr("href", "circuit.html?page=" + i);
        $(pageAT).append(i);
        if (i == pageNum) {
          $(pageLi).addClass("active");
        }
        $(pageLi).append(pageAT);
        // $(pageLi).append(
        //   '<a class="page-link" onclick="getTabArticles(\'' + cate +'\',\''+ i + '\')">' + i + '</a>'
        // )
        $(pagination).append(pageLi);
      }
      
      pagination = paginationTab.getElementsByClassName("pagination")[targetPage]
      var pageBtn = pagination.getElementsByClassName('page-link')
      
      for(var z = 0; z < pageBtn.length; z++){
      $(pageBtn[z]).click(
        (function(category, page){
          return function(){
            $(this).parent().parent().find('.active').removeClass('active')
            $(this).parent().addClass('active')
            var pageNum = page + 1
            console.log('cate, z :', category, pageNum);
            $.ajax({
              method: 'GET',
              url: _config.api.invokeUrl + '/' + category + '?page=' + pageNum,
              headers: {
                Authorization: authToken
              },
              contentType: 'application/json; charset=utf-8',
              success: function (data) {
                $('#'+ category + ' tbody').empty()
                getTabAllData(category, data);
              },
              error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting news: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your news:\n' + jqXHR.responseText);
              }
            });
          }
        })(cate,z))
      }

      function makePageArrow(direction, pageNum, pageLength) {
        switch (direction) {
          case "left":
            if (1 < pageNum && pageNum < pageLength) {
              var pageNum = Number(pageNum) - 1;
              var pageLi = document.createElement("li");
              var pageLeftArrow = document.createElement("a");
              $(pageLeftArrow).attr("href", "circuit.html?page=" + pageNum + "#board")
              var pageLeftArrowImg = document.createElement("img");
              $(pageLeftArrowImg).attr("src", "img/icon-left-arrow.png");
              $(pageLeftArrow).prepend(pageLeftArrowImg);
              $(pageLi).append(pageLeftArrow);
              $(pagination).prepend(pageLi);
            }
            break;
          case "right":
            if (pageNum < pageLength) {
              var pageNum = Number(pageNum) + 1;
              var pageLi = document.createElement("li");
              var pageRightArrow = document.createElement("a");
              $(pageRightArrow).attr("href", "circuit.html?page=" + pageNum + "#board")
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
  }

  // get single article
  function getArticle(article_id) {
    $.ajax({
      method: 'GET',
      url: _config.api.invokeUrl + '/news?article=' + article_id,
      headers: {
        Authorization: authToken
      },
      contentType: 'application/json; charset= utf-8',
      success: completeArticleRequest,
      error: function ajaxError(jqXHR, textStatus, errorThrown) {
        console.error('Error requesting news: ', textStatus, ', Details: ', errorThrown);
        console.error('Response: ', jqXHR.responseText);
        alert('An error occured when requesting your news:\n' + jqXHR.responseText);
      }
    });
  }

  function completeArticleRequest(result) {
    console.log('Response received from API: ', result);
    $('#article-title').val(result['result'].title);
    $('#summernote').summernote('code', result['result'].body);
  }

  // post article
  function postArticle(category, box) {
    console.log('box :', box);
    console.log('JSON.stringify(box) :', JSON.stringify(box));
    $.ajax({
      type: 'POST',
      url: _config.api.invokeUrl + '/' + category,
      headers: {
        Authorization: authToken
      },
      data: JSON.stringify(box),
      contentType: 'application/json; charset= utf-8',
      success: completePostArticleRequest(box),
      error: function ajaxError(jqXHR, textStatus, errorThrown) {
        console.error('Error posting news: ', textStatus, ', Details: ', errorThrown);
        console.error('Response: ', jqXHR.responseText);
        alert('An error occured when posting your news:\n' + jqXHR.responseText);
      }
    });
  }



  function completePostArticleRequest(box) {
    alert('등록되었습니다.')
    // console.log('result :', box);
    window.location.href = 'circuit.html?page=1';
  }

  // Initialize
  $(function onDocReady() {
    if (!_config.api.invokeUrl) {
      $('#noApiMessage').show();
    }

    // load datas
    var article_id = getUrlParam('article');
    if (article_id == undefined) { // circuit.html
      // console.log('enter get all articles');
      var page = getUrlParam('page');
      // if (page == undefined){
      //     getAllArticles(1);
      // }
      // else{
      //     getAllArticles(page);
      // }
    } else { // pit-in.html
      // create new article, if article_id == -1
      $('#article_id').val(article_id);
      if (article_id > 0) {
        article = getArticle(article_id);
      }
    }

    // set click methods
    $('#signOut').click(function () {
      Cognito.signOut();
      alert("You have been signed out.");
      window.location = "/signin.html";
    });
    $('#create-post').click(function () {
      // create new article, if article_id == -1
      window.location = '/pit-in.html?article=-1';
    });
    $('.get-article').click(function () {
      window.location = $(this).data('href');
    });

    // set method in pit-in.html
    $('#postForm').submit(handlePostArticle);
  });

  deleteArticle = function deleteArticle(category, id) {
    //  console.log('object :', category);
    $.ajax({
      method: 'POST',
      url: _config.api.invokeUrl + '/delete',
      contentType: 'application/json; charset= utf-8',
      headers: {
        Authorization: authToken
      },
      data: JSON.stringify({
        "object_id": id,
        "object_name": category
      }),
      success: function () {
        alert('삭제되었습니다.')
        window.location.href = 'circuit.html?page=1';
      },
      error: function ajaxError(jqXHR, textStatus, errorThrown) {
        console.error('Error requesting news: ', textStatus, ', Details: ', errorThrown);
        console.error('Response: ', jqXHR.responseText);
        alert('An error occured when requesting your news:\n' + jqXHR.responseText);
      }
    });
  }

  function getUrlParam(param) {
    var queryString = window.location.search.slice(1);
    var result;
    if (queryString) {
      // get rid of stuff after #
      queryString = queryString.split('#')[0];
      var arr = queryString.split('&');

      for (var i = 0; i < arr.length; i++) {
        var a = arr[i].split('=');

        if (a[0] == param) {
          return a[1]
        }
      }
      return result;
    } else {
      return result;
    }
  }

  function handlePostArticle(event) {
    event.preventDefault();

    var category = $('#category').val();
    var article_id = $('#article_id').val();
    if (article_id == "") {
      article_id = -1;
    }
    var title = $('#article-title').val();
    var body = $('#summernote').summernote('code');
    var output = document.getElementById('output');

    if (category == "recruit") {
      var kinds = $('#type').val();
      var date = $('#due-to').val();
      var available = $('#available').val();
      var box = {
        'id': article_id,
        'title': title,
        'body': body,
        'date': date,
        'kinds': kinds,
        'available': available
      }
      postArticle(category, box);

    } else if (category == "news") {
      var date = $('#date').val();
      var box = {
        'id': article_id,
        'title': title,
        'body': body,
        'date': date,
        'image': '',
        'to_main': ''
      }
      getBase64();
      $('#output').bind('DOMNodeInserted DOMNodeRemoved', function () {
        var baseCode = document.querySelector("#output span").innerHTML; //encoded code by base64
        box['image'] = baseCode;
        box['to_main'] = $('#toMain').prop("checked");
        // console.log('box :', box);
        postArticle(category, box);
      });
    } else if (category == "disclosure") {
      var date = $('#date').val();
      var url = $('#info_url').val()
      var submitter = $('#submitter').val()
      var box = {
        'id': article_id,
        'title': title,
        'submitter': submitter,
        'info_url': url,
        'date': date
      }
      postArticle(category, box);
    }
  }

  function getBase64() {
    var file = document.getElementById("mainImg").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      var newSpan = document.createElement("span");
      var newContent = document.createTextNode(reader.result.split('base64,')[1]);
      newSpan.appendChild(newContent)
      output.appendChild(newSpan)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}(jQuery));