//>>built
define("dijitive/Textbox",["dojo/_base/declare","dojo/dom-attr","dijit/form/_FormValueWidget","dijit/form/_TextBoxMixin"],function(c,b,d,e){return c([d,e],{templateString:'<input data-dojo-attach-point="textbox,focusNode" type="text" ${!nameAttrSetting} />',_setPlaceHolderAttr:function(a){b.set(this.domNode,"placeholder",this.filter(a))},_setAutocompleteAttr:function(a){b.set(this.domNode,"autocomplete",a?"on":"off")}})});