//>>built
require({cache:{"url:dijit/form/templates/Button.html":'<span class="dijit dijitReset dijitInline" role="presentation"\n\t><span class="dijitReset dijitInline dijitButtonNode"\n\t\tdata-dojo-attach-event="ondijitclick:_onClick" role="presentation"\n\t\t><span class="dijitReset dijitStretch dijitButtonContents"\n\t\t\tdata-dojo-attach-point="titleNode,focusNode"\n\t\t\trole="button" aria-labelledby="${id}_label"\n\t\t\t><span class="dijitReset dijitInline dijitIcon" data-dojo-attach-point="iconNode"></span\n\t\t\t><span class="dijitReset dijitToggleButtonIconChar">&#x25CF;</span\n\t\t\t><span class="dijitReset dijitInline dijitButtonText"\n\t\t\t\tid="${id}_label"\n\t\t\t\tdata-dojo-attach-point="containerNode"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type="${type}" value="${value}" class="dijitOffScreen"\n\t\ttabIndex="-1" role="presentation" data-dojo-attach-point="valueNode"\n/></span>\n'}});
define("dijit/form/Button","require,dojo/_base/declare,dojo/dom-class,dojo/has,dojo/_base/kernel,dojo/_base/lang,dojo/ready,./_FormWidget,./_ButtonMixin,dojo/text!./templates/Button.html".split(","),function(c,d,e,f,g,b,h,i,j,k){f("dijit-legacy-requires")&&h(0,function(){c(["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"])});return d("dijit.form.Button",[i,j],{showLabel:!0,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",
templateString:k,_setValueAttr:"valueNode",_onClick:function(a){var b=this.inherited(arguments);b&&this.valueNode&&(this.valueNode.click(),a.preventDefault(),a.stopPropagation());return b},_fillContent:function(a){if(a&&(!this.params||!("label"in this.params)))if(a=b.trim(a.innerHTML))this.label=a},_setShowLabelAttr:function(a){this.containerNode&&e.toggle(this.containerNode,"dijitDisplayNone",!a);this._set("showLabel",a)},setLabel:function(a){g.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.",
"","2.0");this.set("label",a)},_setLabelAttr:function(a){this.inherited(arguments);if(!this.showLabel&&!("title"in this.params))this.titleNode.title=b.trim(this.containerNode.innerText||this.containerNode.textContent||""),this.textDir&&this.titleNode.title&&this.applyTextDir(this.titleNode,this.titleNode.title)},_setTextDirAttr:function(a){this._created&&this.textDir!=a&&(this._set("textDir",a),this._setLabelAttr(this.label))}})});