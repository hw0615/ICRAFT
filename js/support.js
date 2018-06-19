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
    var file = document.getElementById("file");  
    var fileName = file.files[0].name;
    var fileSize = file.files[0].size;  
    var fileType = file.files[0].type;  
    var supportFile = document.getElementById("file").files[0];      
    var output = document.getElementById('output');          
    
    function getBase64(supportFile) {
        var reader = new FileReader();         
        reader.readAsDataURL(supportFile);                
        reader.onload = function () {   
            console.log('reader.result :', reader.result);        
            console.log('data :',  reader.result.split('base64,')[1]);                        
            var newSpan = document.createElement("span"); 
            // and give it some content 
            var newContent = document.createTextNode(reader.result.split('base64,')[1]); 
            // add the text node to the newly created div
            newSpan.appendChild(newContent)   
            output.appendChild(newSpan)               
        };        
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };    
    }   
    getBase64(supportFile);
    
    $('#output').bind('DOMNodeInserted DOMNodeRemoved', function() {
        var baseCode = document.querySelector("#output span").innerHTML;
        data['filename'] = baseCode;        
        getPost(data);    
    });
}

function getPost(data){         
    $.ajax({
        method: 'POST',
        url: _config.api.invokeUrl + '/contact',           
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: completePost
        
    });                
}

function completePost() {        
    window.location.href = 'index.html';
}

$(".get-btn").click(function(event){
    event.preventDefault();
    getData()    
})
