require([
    "dijitive/Radio",
    "dojo/parser",
    "dojo/domReady!"
], function (
    Radio,
    parser
) {
    "use strict";
    
    var w1 = new Radio({
        name: 'xxx',
        value: 'clam chowder',
        //checked: true,
        onChange: function (e) {
            console.log('value is: ' + this.get('value'));
        }
    }, 'w1');

    w1.startup();
    
    var w2 = new Radio({
        name: 'xxx',
        value: 'lobster & steak',
        checked: true,
        onChange: function (e) {
            console.log('value is: ' + this.get('value'));
        }
    }, 'w2');

    w2.startup();
    
    
    
    
    var w3 = new Radio({
        name: 'yyy',
        disabled: true,
        value: 'clam chowder',
        checked: true,
        onChange: function (e) {
            console.log('value is: ' + this.get('value'));
        }
    }, 'w3');

    w3.startup();
    
    var w4 = new Radio({
        name: 'yyy',
        disabled: true,
        value: 'lobster & steak',
        checked: false,
        onChange: function (e) {
            console.log('value is: ' + this.get('value'));
        }
    }, 'w4');

    w4.startup();
});