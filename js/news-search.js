$(function () {

  var box;    
  var pageUrl = window.location.href.split("?");    
  // console.log('pageUrl :', pageUrl[1]);
  var pageNum = pageUrl[1].split("=")[1].replace(/[a-z,#,&,_]/g, "");    
  // console.log('pageNum :', pageNum);    
  var searchForm = document.getElementsByClassName("search-bar")[0];  
  var searchBtn = searchForm.getElementsByClassName("get-btn")[0];

  $(searchForm).find("input").keypress(function(){
    if (event.keyCode == 13) {
        event.preventDefault();
        $(searchBtn).click();
    }   
  }) 

  $(searchBtn).click(function(){
    var searchKey = searchForm.getElementsByTagName("input")[0].value;                        
    window.location = "file:///C:/Users/thdwj/Documents/Icraft/news-searched.html?page=" + pageNum + '&search=' + searchKey + '#board'
  });
  

});