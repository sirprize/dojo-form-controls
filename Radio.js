define([
    "dojo/_base/declare",
    "./Checkbox",
    "dijit/form/_RadioButtonMixin"
], function (
    declare,
    Checkbox,
    _RadioButtonMixin
) {
    return declare([Checkbox, _RadioButtonMixin], {
        // summary:
        //      Provide widget functionality for an HTML <input type="radio"> control
    });
});