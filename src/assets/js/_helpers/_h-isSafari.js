var isSafari = (function() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
})();

module.exports = isSafari;