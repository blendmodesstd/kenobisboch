const Signature = function() {

    function _init() {
        var styles1 = [
              'color: #000'
            , 'display: block'
            , 'line-height: 28px'
            , 'padding: 10px 10px 10px 10px'
            , 'background: #fff'
            , 'font-weight: lighter'
        ].join(';');

        var styles2 = [
              'color: white'
            , 'display: block'
            , 'line-height: 28px'
            , 'padding: 10px 10px 10px 10px'
            , 'background: #000'
            , 'font-weight: lighter'
        ].join(';');

        console.log('%c Developed by', styles1);
        console.log('%cwww.blendmodes.com', styles2);
        console.log('%c Do you know the Konami Code?', styles1);
    }

    return {
        init: _init
    }

}

export default Signature
