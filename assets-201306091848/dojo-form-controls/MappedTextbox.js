//>>built
define("dojo-form-controls/MappedTextbox",["dojo/_base/declare","mijit/_WidgetBase","mijit/_TemplatedMixin","dojo/dom-construct"],function(c,d,e,b){return c([d,e],{templateString:'\x3cinput type\x3d"text" data-dojo-attach-point\x3d"containerNode"/\x3e',name:"",valueNode:null,_setNameAttr:function(a){this.valueNode&&(this.valueNode.name=a);this._set("name",a)},_setValueAttr:function(a){a=this._parseValue(a);var b=this.get("value");this.valueNode&&(this.valueNode.value=this._serializeValue(a));this.domNode.value=
this._formatValue(a);this._set("value",a);if(b!==a)this.onChange(a)},_parseValue:function(a){return a},_serializeValue:function(a){return a},_formatValue:function(a){return a},_attrToDom:function(a,b,c){"name"!==a&&this.inherited(arguments)},onChange:function(a){},_getDisplayValueAttr:function(){return this.domNode.value},startup:function(){this.inherited(arguments);this.valueNode=b.create("input",{type:"hidden",name:this.get("name"),value:this._serializeValue(this.get("value"))},this.domNode,"after")},
destroy:function(){b.destroy(this.valueNode);this.inherited(arguments)}})});
//@ sourceMappingURL=MappedTextbox.js.map