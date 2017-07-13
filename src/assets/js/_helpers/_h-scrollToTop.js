var getOffsetTop = require('./_h-getOffsetTop');
var scrollToTop = function(el,offset) {
    var o = offset || 0
    var top = el ? (getOffsetTop(el) + o) : 0; 
    document.body.scrollTop = top;
    document.documentElement.scrollTop = top;    
};

module.exports = scrollToTop;