define("dijitive/Button", [
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/form/_FormWidget",
    "dijit/form/_ButtonMixin"
], function (
    declare,
    lang,
    _FormWidget,
    _ButtonMixin
) {
    return declare([_FormWidget, _ButtonMixin], {
        // summary:
        //      Provide widget functionality for an HTML <button> control
        
        templateString: '<button ${!nameAttrSetting} type="${type}" value="${value}" data-dojo-attach-point="focusNode,valueNode,labelNode" data-dojo-attach-event="onclick:_onClick"></button>',
        
        _fillContent: function(/*DomNode*/ source){
            // summary:
            //      This method is an exact copy of dijit/form/Button._fillContent
            // Overrides _Templated._fillContent().
            // If button label is specified as srcNodeRef.innerHTML rather than
            // this.params.label, handle it here.
            // TODO: remove the method in 2.0, parser will do it all for me
            if(source && (!this.params || !("label" in this.params))){
                var sourceLabel = lang.trim(source.innerHTML);
                if(sourceLabel){
                    this.label = sourceLabel; // _applyAttributes will be called after buildRendering completes to update the DOM
                }
            }
        }
    });
});