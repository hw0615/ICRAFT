function getData(){    
    // var supportForm = document.getElementsByClassName("support-form")[0];
    // var supportTitle = document.getElementById("title");
    // var supportName = document.getElementById("name");
    // var supportEmail = document.getElementById("eMail");
    // var supportContent = document.getElementById("content");
    // var box = {
    //     "title" : $(supportTitle).val(),
    //     "name" : $(supportName).val(),
    //     "email" : $(supportEmail).val(),
    //     "message" : $(supportContent).val(),        
    // };    
    getPost();
}

function getPost(){
    // console.log('box :', box);
    var supportTitle = document.getElementById("title");
    var supportName = document.getElementById("name");
    var supportEmail = document.getElementById("eMail");
    var supportContent = document.getElementById("content");
    
    $.ajax({
        method: 'POST',
        url: _config.api.invokeUrl + '/contact',   
        data: JSON.stringify({
            "title" : $(supportTitle).val(),
            "name" : $(supportName).val(),
            "email" : $(supportEmail).val(),
            "message" : $(supportContent).val(), 
            "msg" : $("#file").val()
        }),
        contentType: 'application/json; charset=utf-8',
        success: completePost,
        error: function ajaxError(jqXHR, textStatus, errorThrown) {
            console.error('Error requesting news: ', textStatus, ', Details: ', errorThrown);
            console.error('Response: ', jqXHR.responseText);
            alert('An error occured when requesting your news:\n' + jqXHR.responseText);
        }
    });                
}
function completePost() {    
    window.location.href = 'index.html';
}

$(".get-btn").click(function(){
    getData()
})