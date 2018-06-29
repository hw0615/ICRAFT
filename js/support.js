var data = {
    "title": '',
    "name": '',
    "email": '',
    "message": '',
    "filename": '',
    "filedata": ''
};

function getData(){
    data['title'] = document.getElementById("title").value;
    data['name'] = document.getElementById("name").value;
    data['email'] = document.getElementById("email").value;
    data['message'] = document.getElementById("content").value;
    var file = document.getElementById("file");
    var output = document.getElementById('output');

    if ( file.files.length !== 0 ) {
      var supportFile = file.files[0];
      data['filename'] = file.files[0].name;
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
          data['filedata'] = baseCode;
          getPost(data);
        });
    } else if( file.files.length === 0 ){
      getPost(data);
    }

}

function getPost(data){
    console.log('data :', JSON.stringify(data));
    $.ajax({
        method: 'POST',
        url: _config.api.invokeUrl + '/contact',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: completePost
    });
  }
  
function completePost() {
    // console.log('data :', data);
    alert('완료되었습니다.')
    window.location.href = 'support.html';
}

$(".get-btn").click(function(event){
  var title = $('#title')
  var name =  $('#name')
  var email = $('#email')
  var content = $('#content')

  function email_check( email ) {  
    var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email != '' && email != 'undefined' && regex.test(email));
  }
    event.preventDefault();
    if ( title.val() === '' ) {
      alert('제목을 입력해주세요.')
      title.focus()
      return false
    } else if ( name.val() === '' ) {
      alert('이름을 입력해주세요.') 
      name.focus()
      return false
    } else if ( email.val() === '' ) {
      alert('이메일 주소를 입력해주세요.') 
      email.focus()
      return false
    } else if ( !email_check(email.val()) ) {
    // } else if ( regExp.test(email) ) {
      alert('정확한 이메일 주소를 입력해주세요.') 
      email.focus()
      return false
    } else if ( content.val() === '' ) {
      alert('내용을 입력해주세요.') 
      content.focus()
      return false
    }
    getData()
})
