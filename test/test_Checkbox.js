require([
    "dijitive/Checkbox",
    "dojo/parser",
    "dojo/domReady!"
], function (
    Checkbox,
    parser
) {
    "use strict";
    
    var w1 = new Checkbox({
        name: 'xxx',
        value: 'clam chowder',
        checked: true,
        onChange: function (e) {
            console.log('value is: ' + this.get('value'));
        }
    }, 'w1');

    w1.startup();
    
    
    var w3 = new Checkbox({
        name: 'zzz',
        disabled: true,
        value: 'clam chowder',
        checked: false,
        onChange: function (e) {
            console.log('value is: ' + this.get('value'));
        }
    }, 'w3');

    w3.startup();
});