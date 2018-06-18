var data = {
    "title": '',
    "name": '',
    "email": '',
    "message": '',
    "filename": ''
};

function getData(){      
    data['title'] = document.getElementById("title").value;
    data['name'] = document.getElementById("name").value;
    data['email'] = document.getElementById("email").value;
    data['message'] = document.getElementById("content").value;    
    var supportFile = document.getElementById("file").files[0];              
    var output = document.getElementById('output');          

    function getBase64(supportFile) {
        var reader = new FileReader();
        // console.log('reader :', reader);   
        reader.readAsDataURL(supportFile);                
        reader.onload = function () {           
            console.log('data :',  reader.result.split('base64,')[1]);                        
            var newSpan = document.createElement("span"); 
            // and give it some content 
            var newContent = document.createTextNode(reader.result.split('base64,')[1]); 
            // add the text node to the newly created div
            newSpan.appendChild(newContent)   
            output.appendChild(newSpan)               
        };
        // console.log('reader.onload  :', reader.onload() );
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };    
    }   
    getBase64(supportFile);

    $('#output').bind('DOMNodeInserted DOMNodeRemoved', function() {
       var aaa = document.querySelector("#output span").innerHTML;
       data['filename'] = aaa;  
    //    console.log('object :', data['filename']);     
    //    console.log('data :', data);
       getPost(data);    
    });
}

function getPost(data){         
    console.log('data :', data);
    console.log('data :', JSON.stringify(data));
    $.ajax({
        method: 'POST',
        url: _config.api.invokeUrl + '/contact',   
        // data: data,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: completePost
        
    });                
}

function completePost() {    
    console.log('box :', data);
    // window.location.href = 'index.html';
}

$(".get-btn").click(function(event){
    event.preventDefault();
    getData()    
})


// $("#supportForm").submit(function(e) {
//     e.preventDefault();    
//     var formData = new FormData(this);
//     // var formData = $('"#supportForm').serialize();
//     var box = {};
//     var supportFile = document.getElementById("file").files[0];
//     formData.forEach(function(value, key){
//         if(key == "file"){
//             key = "filename";
//             value =  getBase64(supportFile);
//         }
//             box[key] = value;
           

//     });
//     function getBase64(supportFile) {
//         var reader = new FileReader();
//         reader.readAsDataURL(supportFile);
//         reader.onload = function () {           
//           console.log('data :',  reader.result.split('base64,')[1]);
//         };
//         reader.onerror = function (error) {
//           console.log('Error: ', error);
//         };
//         var filename = reader.result.split('base64,')[1]
//         return filename
//         //   console.log('data :', reader.result);
//      }
     
    


    
//     console.log('box :', box);
//     $.ajax({
//         url: _config.api.invokeUrl + '/contact',     
//         // method: 'post',    
//         type: 'POST',
//         headers: {
//             'Access-Control-Allow-Origin': '*'
//         },
//         // data: box,
//         // data: JSON.stringify(box),
//         success: function (data) {
//             alert(data)
//         },
//         cache: false,
//         // contentType: false,
//         contentType: 'application/json; charset=utf-8',
//         processData: false,
//         error: function ajaxError(jqXHR, textStatus, errorThrown) {
//                     console.error('Error requesting news: ', textStatus, ', Details: ', errorThrown);
//                     console.error('Response: ', jqXHR.responseText);
//                     alert('An error occured when requesting your news:\n' + jqXHR.responseText);
//                 }
//     });
//     // $.ajax({
//     //     url: _config.api.invokeUrl + '/contact',   
//     //     type: 'POST',
//     //     data: box,
//     //     // data: JSON.stringify(box),
//     //     // headers: {
//     //     //     'Access-Control-Allow-Origin': '*'
//     //     // },
//     //     cache: false,
//     //     contentType: false,
//     //     processData: false,
//     //     // contentType: 'application/json; charset=utf-8',
//     //     success: completePost,
//     //     error: function ajaxError(jqXHR, textStatus, errorThrown) {
//     //         console.error('Error requesting news: ', textStatus, ', Details: ', errorThrown);
//     //         console.error('Response: ', jqXHR.responseText);
//     //         alert('An error occured when requesting your news:\n' + jqXHR.responseText);
//     //     }
//     // });      
// });