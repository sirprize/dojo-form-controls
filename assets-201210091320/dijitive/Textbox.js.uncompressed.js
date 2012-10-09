define("dijitive/Textbox", [
    "dojo/_base/declare",
    "dojo/dom-attr",
    "dijit/form/_FormValueWidget",
    "dijit/form/_TextBoxMixin"
], function (
    declare,
    domAttr,
    _FormValueWidget,
    _TextBoxMixin
) {
    return declare([_FormValueWidget, _TextBoxMixin], {
        // summary:
        //      Provide widget functionality for an HTML <input type="text"> control
        
        templateString: '<input data-dojo-attach-point="textbox,focusNode" type="text" ${!nameAttrSetting} />',
        
        _setPlaceHolderAttr: function (value) {
            domAttr.set(this.domNode, 'placeholder', this.filter(value));
        },
        
        _setAutocompleteAttr: function (value) {
            domAttr.set(this.domNode, 'autocomplete', (value) ? 'on' : 'off');
        }
    });
});