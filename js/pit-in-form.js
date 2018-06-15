var category = $('#category');
var date, res;
date = new Date();
res = date.toISOString().split('T')[0];
makeForm();
$(category)
  .change(function () {
    makeForm();
  })
  .change();  

function makeForm(){
  $(".cate-form").empty();
    if(category.val() == "recruit"){  
        $(".cate-form").append(
          `<label for='due-to'>접수기한: </label>                            
          <input id='due-to' type='text' name='subject' placeholder='yyyy-mm-dd'>
          <label for='type'>지원구분: </label>                                                                                
          <select name='type' id='type'>
              <option value='신입'>신입</option>
              <option value='경력'>경력</option>                            
          </select>
          <label for='available'>지원가능여부:</label>                                                                                
          <select name='available' id='available'>
              <option value='가능'>가능</option>
              <option value='불가능'>불가능</option>                            
          </select>`
        )  
    } else if(category.val() == "news"){
        $(".cate-form").append(
          `<label for='date'>날짜: </label>                            
          <input id='date' type='text' name='subject' value='${res}' placeholder='${res}' disabled>`    
        )
    }
}