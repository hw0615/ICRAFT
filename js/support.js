function getData(){    
    var supportTitle = document.getElementById("title").value;
    var supportName = document.getElementById("name").value;
    var supportEmail = document.getElementById("eMail").value;
    var supportContent = document.getElementById("content").value;
    var supportFile = document.getElementById("file");
    // console.log('supportTitle :', supportTitle);
    var object = new FormData();
    // console.log('object :', object);
   
    object.append( "title", supportTitle);
    object.append( "name", supportName);
    object.append( "email", supportEmail);
    object.append("message", supportContent);    
    // object.append("filename" , supportFile.files[0]);
    // console.log('object :', supportFile.files[0].name);
    // var contentFile = new Blob(supportFile.files[0].file)
    // console.log('contentFile :', contentFile);
    // object.append("filename" , contentFile);
    console.log('object :', object);
    var box = {}
    object.forEach(function(value, key){
        box[key] = value;
    });
    console.log('object :', box);    
    getPost(box);
}

function getPost(box){
    console.log('box :', box);
    console.log('JSON.stringify(box) :', JSON.stringify(box));
    $.ajax({
        method: 'POST',
        url: _config.api.invokeUrl + '/contact',   
        data: box,
        // data: JSON.stringify(box),
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
    console.log('box :', box);
    window.location.href = 'index.html';
}

$(".get-btn").click(function(event){
    event.preventDefault();
    getData()
})



// $("#supportForm").submit(function(event){
//     event.preventDefault(); //prevent default action 
    
//     var request_method = $(this).attr("method"); //get form GET/POST method
//     var form_data = new FormData(this); //Creates new FormData object
//     console.log('form_data :', form_data);
//     $.ajax({
//         url : _config.api.invokeUrl + '/contact',        
//         method: request_method,
//         enctype: "multipart/form-data",
//         data : form_data,
//         contentType: 'application/json; charset=utf-8',
//         cache: false,
//         processData:false
//     }).done(function(response){ //
//         console.log('response :', response);
//     });
// });
// function fileUpload(event) {
//     event.preventDefault(); //prevent default action 
//     var request_method = $(this).attr("method"); //get form GET/POST method

//     $('#supportForm').ajaxForm({
//         url: _config.api.invokeUrl + '/contact',
//         method: 'post',
//         type: request_method,
//         enctype: "multipart/form-data", // 여기에 url과 enctype은 꼭 지정해주어야 하는 부분이며 multipart로 지정해주지 않으면 controller로 파일을 보낼 수 없음
//         success: function(result){        
//           alert(result);
//         }

//     });

//     // 여기까지는 ajax와 같다. 하지만 아래의 submit명령을 추가하지 않으면 백날 실행해봤자 액션이 실행되지 않는다.

//     $("#supportForm").submit();

// }
// var options = {
//     url: _config.api.invokeUrl + '/contact',
//     dataType:"text", //결과
//     success:function(responseText){
//         alert("업로드 성공!!");
//     }, error:function(e){e.responseText();}
// };

// $("#supportForm").ajaxForm(options).submit();