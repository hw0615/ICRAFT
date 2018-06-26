    var queryString = window.location.search.slice(1);
    var commutCate = document.getElementById('category').value;
    var commutNum;
    if(queryString.length>0){
        commutCate = queryString.split('&')[0];
        commutNum = Number(queryString.split('&')[1].split('=')[1])
        getArticle(commutCate,commutNum);
    }
    var category = document.getElementById('category');    
    var date, res;
    date = new Date();
    res = date.toISOString().split('T')[0];
    makeForm('recruit');
    $(category)
    .change(function () {
        commutCate = document.getElementById('category').value;
        makeForm(commutCate);
    })
    .change();

    function makeForm(commutCate){
        $(".cate-form").empty();
        if(commutCate == "recruit"){            
            $(".cate-form").append(
                "<label for='due-to'>접수기한</label>\n <input id='due-to' type='text' name='subject' placeholder='yyyy-mm-dd'>\n          <label for='type'>지원구분</label>\n          <select name='type' id='type'>\n              <option value='newcomer'>신입</option>\n              <option value='experienced '>경력</option>\n          </select>\n          <label for='available'>지원가능여부</label>\n          <select name='available' id='available'>\n              <option value='possible'>가능</option>\n              <option value='impossible'>불가능</option>\n </select>"
            )
            $('.note-editor').css('display', 'block')
        } else if(commutCate == "news"){
            $(".cate-form").append(
                "<label for='date'>날짜 </label>\n          <input id='date' type='text' name='subject' value='" + res + "' placeholder='" + res + "' disabled>\n  <label for='toMain'>메인에 게시하기</label>\n<input id='toMain' name='toMain' type='checkbox'>\n <label for='mainImg'>이미지</label>\n  <input id='mainImg' class='input-file' type='file' name='mainImg' >" 
            )
            $('.note-editor').css('display', 'block')
        } else if(commutCate == "disclosure"){
            $(".cate-form").append(
                "<label for='date'>날짜</label>\n          <input id='date' class='date-dis' type='text' name='subject' value='" + res + "' placeholder='" + 'yyyy-mm-dd' + "' >\n  <label for='submitter'>제출인</label>\n<input id='submitter' name='submitter' type='text'>\n <label for='info_url'>url</label>\n  <input id='info_url' type='text' name='info_url' >" 
            )
            $('.note-editor').css('display', 'none')
        }
    }

    function getArticle(commutCate,commutNum) {        
        $.ajax({
                method: 'GET',
                url: 'https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod' + '/'+ commutCate +'?page=1'+'&id='+ commutNum,
                contentType: 'application/json; charset= utf-8',
                success: function(result,commutCate){
                completeArticleRequest(result,commutCate);
                },
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
        $('#article_id').val(result['result'].id)
        $('#due-to').val(result['result'].date)
        $('#summernote').summernote('code', result['result'].body);
        if(commutCate == 'recruit'){
            $('#category').val('recruit')
        } else if(commutCate == 'news'){
            $('#category').val('news')
        }
        if(result['result'].kinds == '신입'){
            $('#type').val('newcomer')
        }else if(result['result'].kinds == '경력'){
            $('#type').val('experienced ')
        }
        if(result['result'].available == true){
            $('#available').val('possible')
        } else if(result['result'].available == false){
            $('#available').val('impossible')
        }
    }
