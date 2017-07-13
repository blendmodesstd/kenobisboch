var getScrollTop = function(){
    if(typeof pageYOffset!= 'undefined'){
        return pageYOffset;
    }
    else{
        var B= document.body;
        var D= document.documentElement;
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
    }
}

module.exports = getScrollTop;