    $.ajax({    
        type: "GET",
        url: 'https://nllyo9o76k.execute-api.ap-northeast-2.amazonaws.com/prod/news/main',
        dataType: "JSON",
        success: function(data){ 
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
        
        $('#newsBox').css('background-image','url(' + href +')')
        $('#newsTitle').text(body)
        $('#newsSummary').text(title)
    }
