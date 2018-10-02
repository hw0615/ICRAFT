
function makePagenation(data){
    if(checkUrlKey !== 'pit-in.html'){                
        var pagination = document.getElementsByClassName("pagination")[0];                
        var pageLength = Math.ceil((data.total)/10);      
        var pageNum = pageUrl[1].split("=")[1].replace(/[a-z,#,&,_]/g, ""); 
        $(pagination).empty();
        
        for(var i=1; i <= pageLength; i++){
        var pageLi = document.createElement("li");
        var pageAT = document.createElement("a");        
        $(pageLi).attr("class","page-item");   
        $(pageAT).attr("class","page-link");      
        $(pageAT).attr("href", "circuit.html?page=" + i );
        $(pageAT).append(i);   
        if(i == pageNum){
            $(pageLi).addClass("active"); 
        }
        $(pageLi).append(pageAT);     
        $(pagination).append(pageLi);
        }      
        
        function makePageArrow(direction, pageNum,pageLength){
            switch(direction) {
                case "left":          
                if( 0 < pageNum && pageNum < pageLength){              
                    var pageNum = Number(pageNum) -1;               
                    var pageLi = document.createElement("li");        
                    var pageLeftArrow = document.createElement("a");
                    $(pageLeftArrow).attr("href", "circuit.html?page=" + pageNum + "#board")
                    var pageLeftArrowImg = document.createElement("img");
                    $(pageLeftArrowImg).attr("src", "img/icon-left-arrow.png");
                    $(pageLeftArrow).prepend(pageLeftArrowImg);
                    $(pageLi).append(pageLeftArrow);
                    $(pagination).prepend(pageLi);                 
                }                             
                break;          
                case "right":          
                if( pageNum < pageLength ){
                    var pageNum = Number(pageNum) +1;                                         
                    var pageLi = document.createElement("li");                  
                    var pageRightArrow = document.createElement("a");
                    $(pageRightArrow).attr("href", "circuit.html?page=" + pageNum + "#board")
                    var pageRightArrowImg = document.createElement("img");
                    $(pageRightArrowImg).attr("src", "img/icon-right-arrow.png");
                    $(pageRightArrow).append(pageRightArrowImg);
                    $(pageLi).append(pageRightArrow);          
                    $(pagination).append(pageLi); 
                }
                break;                          
            }
        }
        makePageArrow("left", pageNum, pageLength);
        makePageArrow("right", pageNum, pageLength);
    }     
}
