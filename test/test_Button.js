require([
    "dijitive/Button",
    "dojo/parser",
    "dojo/domReady!"
], function (
    Button,
    parser
) {
    "use strict";
    
    var w1 = new Button({
        type: 'submit',
        'class': 'btn btn-primary',
        label: 'Click',
        onClick: function (e) {
            console.log('clicked');
            return true; // if type=submit, submit of parent form/widget can be canceled by returning false
        }
    }, 'w1');

    w1.startup();
    
    var w2 = new Button({
        type: 'submit',
        'class': 'btn btn-danger',
        label: 'Click',
        onClick: function (e) {
            console.log('clicked');
            return false; // if type=submit, submit of parent form/widget can be canceled by returning false
        }
    }, 'w2');

    w2.startup();
    
    var w3 = new Button({
        'class': 'btn btn-inverse',
        label: '<i class="icon-home icon-white"></i> Click',
        onClick: function (e) {
            console.log('clicked');
        }
    }, 'w3');

    w3.startup();
    
    var w4 = new Button({
        'class': 'btn',
        label: '<i class="icon-ok"></i>',
        onClick: function (e) {
            console.log('clicked');
        }
    }, 'w4');

    w4.startup();
});