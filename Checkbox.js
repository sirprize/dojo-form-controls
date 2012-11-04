define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-attr",
    "dojo/on",
    "dijit/form/_FormWidget",
    "dijit/form/_CheckBoxMixin"
], function (
    declare,
    lang,
    domAttr,
    on,
    _FormWidget,
    _CheckBoxMixin
) {
    return declare([_FormWidget, _CheckBoxMixin], {
        // summary:
        //      Provide widget functionality for an HTML <input type="checkbox"> control
        
        templateString: '<input ${!nameAttrSetting} type="${type}" ${checkedAttrSetting} data-dojo-attach-point="containerNode,focusNode" />',
        
        postMixInProperties: function() {
            this.inherited(arguments);
            
            // Need to set initial checked state as part of template, so that form submit works.
            // domAttr.set(node, "checked", bool) doesn't work on IE until node has been attached
            // to <body>, see #8666
            this.checkedAttrSetting = this.checked ? "checked" : "";
        },
        
        _fillContent: function() {
            // summary:
            //      Get checked attribute on IE when instantiating declaratively
            if (this.srcNodeRef && domAttr.has(this.srcNodeRef, 'data-dojo-type')) {
                this.set('checked', this.srcNodeRef.checked);
            }
        },
        
        postCreate: function () {
            this.own(on(this.domNode, 'change', lang.hitch(this, function (ev) {
                this.set('checked', this.domNode.checked);
            })));
        },
        
        _setCheckedAttr: function (value) {
            this.domNode.checked = !!value;
            this._set("checked", !!value);
            this._handleOnChange(!!value);
        },

        _getValueAttr: function(){
            // summary:
            //      Hook so get('value') works.
            // description:
            //      If the Checkbox is checked, returns the value attribute.
            //      Otherwise returns false.
            return this.checked ? this.value : false;
        }
    });
});