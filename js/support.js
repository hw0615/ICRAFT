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
    
    // var supportTitle = document.getElementById("title");
    // var supportName = document.getElementById("name");
    // var supportEmail = document.getElementById("eMail");
    // var supportContent = document.getElementById("content");
    // var supportFile = document.getElementById("file");
    // console.log('supportTitle :', supportTitle);
    // var box = new FormData();
    // // console.log('box :', box);
    // // box.append( "title", $(supportTitle).val());
    // // box.append( "name", $(supportName).val());
    // // box.append( "email", $(supportEmail).val());
    // // box.append("message", $(supportContent).val());
    // // box.append("filename" , supportFile.files[0]);

    // box.append( "title", supportTitle);
    // box.append( "name", supportTitle);
    // box.append( "email", supportTitle);
    // box.append("message", supportTitle);
    // box.append("filename" , supportFile.files[0]);
    // console.log('box :', box);

    $.ajax({
        method: 'POST',
        url: _config.api.invokeUrl + '/contact',   
        data: JSON.stringify(
        //    box
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
    var supportTitle = document.getElementById("title").value;
    var supportName = document.getElementById("name").value;
    var supportEmail = document.getElementById("eMail").value;
    var supportContent = document.getElementById("content").value;
    var supportFile = document.getElementById("file").value;
    // console.log('supportTitle :', supportTitle);
    var box = new FormData();
    // console.log('box :', box);
   
    box.append( "title", supportTitle);
    box.append( "name", supportName);
    box.append( "email", supportEmail);
    box.append("message", supportContent);
    // box.append("filename" , supportFile.files[0]);
    console.log('box :', box.get('message'));
})


    

//     document
//   .querySelector('#testForm')
//   .addEventListener('submit', function processForm(e) {
//     e.preventDefault();
//     console.log('processForm');

//     var form = e.currentTarget;
//     var formData = new FormData();

//     Array.prototype.forEach.call(
//       form.querySelectorAll('input[type=file]'),
//       function (input, i) {
//         // use the input name, don't invent another one
//         if (input.value) formData.append(input.name, input.files[0]);
//       }
//     );

//     var request = new XMLHttpRequest();
//     // use the form info, don't couple your JS with an end-point
//     request.open(form.method, form.action);
//     // want to distinguish from non-JS submits?
//     request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//     request.send(formData);

//     request.onload = function(e) {
//         console.log('Request Status', request.status);
//     };
//   })
// ;