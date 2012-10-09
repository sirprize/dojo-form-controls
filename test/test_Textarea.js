require([
    "dijitive/Textarea",
    "dojo/parser",
    "dojo/domReady!"
], function (
    Textarea,
    parser
) {
    "use strict";
    
    var w1 = new Textarea({
        name: 'xxx',
        placeHolder: 'Say hello',
        autocomplete: false,
        uppercase: true,
        onKeyPress: function (ev) {
            console.log('key pressed')
        }
    }, 'w1');

    w1.startup();
    
    w1.watch('value', function (name, oldVal, val) {
        console.log('New value is "' + val);
    });
});