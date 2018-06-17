// function getData(){    
//     var supportTitle = document.getElementById("title").value;
//     var supportName = document.getElementById("name").value;
//     var supportEmail = document.getElementById("eMail").value;
//     var supportContent = document.getElementById("content").value;
//     var supportFile = document.getElementById("file");
//     // console.log('supportTitle :', supportTitle);
//     var object = new FormData();
//     // console.log('object :', object);
   
//     object.append( "title", supportTitle);
//     object.append( "name", supportName);
//     object.append( "email", supportEmail);
//     object.append("message", supportContent);    
//     console.log('object :', supportFile.files[0].name);
//     // var contentFile = new Blob(supportFile.files[0].file)
//     console.log('contentFile :', contentFile);
//     object.append("filename" , contentFile);
//     console.log('object :', object.get('filename'));
//     var box = {}
//     object.forEach(function(value, key){
//         box[key] = value;
//     });
//     console.log('object :', JSON.stringify(box));    
//     getPost(box);
// }

// function getPost(box){
   
//     $.ajax({
//         method: 'POST',
//         url: _config.api.invokeUrl + '/contact',   
//         data: JSON.stringify(
//            box
//         ),
//         contentType: 'application/json; charset=utf-8',
//         success: completePost,
//         error: function ajaxError(jqXHR, textStatus, errorThrown) {
//             console.error('Error requesting news: ', textStatus, ', Details: ', errorThrown);
//             console.error('Response: ', jqXHR.responseText);
//             alert('An error occured when requesting your news:\n' + jqXHR.responseText);
//         }
//     });                
// }
// function completePost() {    
//     window.location.href = 'index.html';
// }

// $(".get-btn").click(function(){
//     getData()
// })
$("#supportForm").submit(function(event){
    event.preventDefault(); //prevent default action 
    
    var request_method = $(this).attr("method"); //get form GET/POST method
    var form_data = new FormData(this); //Creates new FormData object
    console.log('form_data :', form_data);
    $.ajax({
        url : _config.api.invokeUrl + '/contact',        
        type: request_method,
        data : form_data,
        contentType: false,
        cache: false,
        processData:false
    }).done(function(response){ //
        console.log('response :', response);
    });
});
