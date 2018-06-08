$(document).ready(function(){

  var searchBar = document.getElementsByClassName('search-bar')[0];
  var searchBtn = searchBar.getElementsByClassName('get-btn')[0];
  $(searchBar).submit(function(e){
    
    var searchWord = searchBar.getElementsByTagName('input')[0];
    var formData = {
      'word' : $(searchWord).val()
    }    
    console.log('formData :', formData);
    $.ajax({  
      type: "POST",    
      url:"",
      data: formData,
      dataType: "JSON",
      encode: true
    })  
    .done(function(data){
      console.log('data :', data);
    })

    e.preventDefault();

  })  

  $(searchBtn).click(function(){    
    $(searchBar).submit()
  })  
  
})