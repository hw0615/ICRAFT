    $.ajax({    
        type: "GET",
        url: 'https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/news/main',
        dataType: "JSON",
        success: function(data){ 
          // console.log('data :', data);
          var box =  $.parseJSON(data.body)  
          makeArticle(box)    
        },
        error: function(){
            console.log('실패');
        }
    })
    
    function makeArticle(box){
        var href = box.img;
        var title = box.title;
        var body = box.body;
        var id = box.id

        // console.log('id :', id);
        
        $('#newsBox').css('background-image','url(' + href +')')
        $('#newsTitle').text(title)
        $('#newsBody').append(body)
        $('#newsMain').attr('href', 'news-post.html?page=1&id='+id)
    }
