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
    console.log('box :', box);
    
    var supportTitle = document.getElementById("title");
    var supportName = document.getElementById("name");
    var supportEmail = document.getElementById("eMail");
    var supportContent = document.getElementById("content");
    var supportFile = document.getElementById("file");
    var box = new FormData();
    console.log('box :', box);
    box.append( "title", $(supportTitle).val());
    box.append( "name", $(supportName).val());
    box.append("email", $(supportEmail).val());
    box.append("message", $(supportContent).val());
    box.append("filename" ,$(supportFile).files);
    console.log('box :', box);

    $.ajax({
        method: 'POST',
        url: _config.api.invokeUrl + '/contact',   
        data: JSON.stringify(
           box
        ),
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