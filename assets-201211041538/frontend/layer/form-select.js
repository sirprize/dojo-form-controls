//>>built
require({cache:{"dijitive/Select":function(){define("dijitive/Select","dojo/_base/declare,dojo/_base/array,dojo/_base/lang,dijit/form/_FormSelectWidget,dijit/_Container,dojo/dom-attr,dojo/i18n,dojo/on,./Option,dojo/i18n!dijit/form/nls/validate".split(","),function(b,g,h,c,d,f,e,n,i){return b([c,d],{templateString:'<select name="${name}" data-dojo-attach-point="containerNode,focusNode"></select>',required:!1,message:"",_attrToDom:function(b,f,c){"options"!==b&&this.inherited(arguments)},postMixInProperties:function(){var b=
e.getLocalization("dijit/form","validate",this.lang);this._missingMsg=b?b.missingMessage:"Input required";this.inherited(arguments)},postCreate:function(){this.inherited(arguments);this.own(n(this.domNode,"change",h.hitch(this,function(){this._handleOnChange(this._getValueFromChildren());this.validate()})))},startup:function(){if(!this._started)this.store||this._loadChildren(),this._started=!0,this.validate()},_getValueFromChildren:function(){var b=[];if(!this.get("multiple"))return-1===this.domNode.selectedIndex?
null:this.domNode.options[this.domNode.selectedIndex].value;for(x=0;x<this.domNode.length;x+=1)if(this.domNode[x].selected)b[b.length]=this.domNode[x].value;return b},_updateSelection:function(){g.forEach(this.getChildren(),h.hitch(this,function(b){this._select(b)}))},_select:function(b){var f=!1,c=this.get("value");h.isArray(c)?g.forEach(c,function(c){c===b.get("value")&&(f=!0)}):c===b.get("value")&&(f=!0);b.set("selected",f)},_addOptionItem:function(b){this.addChild(new i({value:b.value,label:b.label,
disabled:b.disabled||!1}))},_setDisabledAttr:function(b){this.inherited(arguments);this.validate()},_setRequiredAttr:function(b){var c=b&&!this.get("disabled")?"true":"false";f.set(this.domNode,{required:c,"aria-required":c});this._set("required",b);this.validate()},validate:function(){if(this._started){var b=this.isValid();f.set(this.focusNode,"aria-invalid",b?"false":"true");this._set("message",b?"":this._missingMsg);return b}},isValid:function(){return this.disabled||!this.required||0===this.value||
!/^\s*$/.test(this.value||"")},_onFocus:function(){this.validate();this.inherited(arguments)},_onBlur:function(){this.inherited(arguments);this.validate()}})})},"dijit/form/_FormSelectWidget":function(){define("dijit/form/_FormSelectWidget","dojo/_base/array,dojo/_base/Deferred,dojo/aspect,dojo/data/util/sorter,dojo/_base/declare,dojo/dom,dojo/dom-class,dojo/_base/kernel,dojo/_base/lang,dojo/query,dojo/when,dojo/store/util/QueryResults,./_FormValueWidget".split(","),function(b,g,h,c,d,f,e,n,i,q,k,
m,s){return d("dijit.form._FormSelectWidget",s,{multiple:!1,options:null,store:null,query:null,queryOptions:null,labelAttr:"",onFetch:null,sortByLabel:!0,loadChildrenOnOpen:!1,onLoadDeferred:null,getOptions:function(a){var j=a,c=this.options||[],f=c.length;if(void 0===j)return c;if(i.isArray(j))return b.map(j,"return this.getOptions(item);",this);i.isObject(a)&&(b.some(this.options,function(a,b){return a===j||a.value&&a.value===j.value?(j=b,!0):!1})||(j=-1));if("string"==typeof j)for(a=0;a<f;a++)if(c[a].value===
j){j=a;break}return"number"==typeof j&&0<=j&&j<f?this.options[j]:null},addOption:function(a){i.isArray(a)||(a=[a]);b.forEach(a,function(a){a&&i.isObject(a)&&this.options.push(a)},this);this._loadChildren()},removeOption:function(a){i.isArray(a)||(a=[a]);a=this.getOptions(a);b.forEach(a,function(a){if(a)this.options=b.filter(this.options,function(b){return b.value!==a.value||b.label!==a.label}),this._removeOptionItem(a)},this);this._loadChildren()},updateOption:function(a){i.isArray(a)||(a=[a]);b.forEach(a,
function(a){var b=this.getOptions(a),c;if(b)for(c in a)b[c]=a[c]},this);this._loadChildren()},setStore:function(a,f,d){var e=this.store,d=d||{};if(e!==a){for(var n;n=this._notifyConnections.pop();)n.remove();if(!a.get&&(i.mixin(a,{_oldAPI:!0,get:function(a){var b=new g;this.fetchItemByIdentity({identity:a,onItem:function(a){b.resolve(a)},onError:function(a){b.reject(a)}});return b.promise},query:function(a,b){var c=new g(function(){f.abort&&f.abort()});c.total=new g;var f=this.fetch(i.mixin({query:a,
onBegin:function(a){c.total.resolve(a)},onComplete:function(a){c.resolve(a)},onError:function(a){c.reject(a)}},b));return new m(c)}}),a.getFeatures()["dojo.data.api.Notification"]))this._notifyConnections=[h.after(a,"onNew",i.hitch(this,"_onNewItem"),!0),h.after(a,"onDelete",i.hitch(this,"_onDeleteItem"),!0),h.after(a,"onSet",i.hitch(this,"_onSetItem"),!0)];this._set("store",a)}this.options&&this.options.length&&this.removeOption(this.options);this._queryRes&&this._queryRes.close&&this._queryRes.close();
d.query&&(this._set("query",d.query),this._set("queryOptions",d.queryOptions));if(a)this._loadingStore=!0,this.onLoadDeferred=new g,this._queryRes=a.query(this.query,this.queryOptions),k(this._queryRes,i.hitch(this,function(e){if(this.sortByLabel&&!d.sort&&e.length)if(e[0].getValue)e.sort(c.createSortFunction([{attribute:a.getLabelAttributes(e[0])[0]}],a));else{var h=this.labelAttr;e.sort(function(a,b){return a[h]>b[h]?1:b[h]>a[h]?-1:0})}d.onFetch&&(e=d.onFetch.call(this,e,d));b.forEach(e,function(a){this._addOptionForItem(a)},
this);this._queryRes.observe&&this._queryRes.observe(i.hitch(this,function(a,b,c){b==c?this._onSetItem(a):(-1!=b&&this._onDeleteItem(a),-1!=c&&this._onNewItem(a))}),!0);this._loadingStore=!1;this.set("value","_pendingValue"in this?this._pendingValue:f);delete this._pendingValue;this.loadChildrenOnOpen?this._pseudoLoadChildren(e):this._loadChildren();this.onLoadDeferred.resolve(!0);this.onSetStore()}),function(a){console.error("dijit.form.Select: "+a.toString());this.onLoadDeferred.reject(a)});return e},
_setValueAttr:function(a,c){this._onChangeActive||(c=null);if(this._loadingStore)this._pendingValue=a;else{var f=this.getOptions()||[];i.isArray(a)||(a=[a]);b.forEach(a,function(c,e){i.isObject(c)||(c+="");"string"===typeof c&&(a[e]=b.filter(f,function(a){return a.value===c})[0]||{value:"",label:""})},this);a=b.filter(a,function(a){return a&&a.value});if(!this.multiple&&(!a[0]||!a[0].value)&&f.length)a[0]=f[0];b.forEach(f,function(c){c.selected=b.some(a,function(a){return a.value===c.value})});var e=
b.map(a,function(a){return a.value}),d=b.map(a,function(a){return a.label});"undefined"==typeof e||"undefined"==typeof e[0]||(this._setDisplay(this.multiple?d:d[0]),this.inherited(arguments,[this.multiple?e:e[0],c]),this._updateSelection())}},_getDisplayedValueAttr:function(){var a=this.get("value");i.isArray(a)||(a=[a]);a=b.map(this.getOptions(a),function(a){return a&&"label"in a?a.label:a?a.value:null},this);return this.multiple?a:a[0]},_loadChildren:function(){this._loadingStore||(b.forEach(this._getChildren(),
function(a){a.destroyRecursive()}),b.forEach(this.options,this._addOptionItem,this),this._updateSelection())},_updateSelection:function(){this._set("value",this._getValueFromOpts());var a=this.value;i.isArray(a)||(a=[a]);a&&a[0]&&b.forEach(this._getChildren(),function(c){var f=b.some(a,function(a){return c.option&&a===c.option.value});e.toggle(c.domNode,this.baseClass.replace(/\s+|$/g,"SelectedOption "),f);c.domNode.setAttribute("aria-selected",f?"true":"false")},this)},_getValueFromOpts:function(){var a=
this.getOptions()||[];if(!this.multiple&&a.length){var c=b.filter(a,function(a){return a.selected})[0];if(c&&c.value)return c.value;a[0].selected=!0;return a[0].value}return this.multiple?b.map(b.filter(a,function(a){return a.selected}),function(a){return a.value})||[]:""},_onNewItem:function(a,b){(!b||!b.parent)&&this._addOptionForItem(a)},_onDeleteItem:function(a){this.removeOption(this.store.getIdentity(a))},_onSetItem:function(a){this.updateOption(this._getOptionObjForItem(a))},_getOptionObjForItem:function(a){var b=
this.store,c=this.labelAttr&&this.labelAttr in a?a[this.labelAttr]:b.getLabel(a);return{value:c?b.getIdentity(a):null,label:c,item:a}},_addOptionForItem:function(a){var b=this.store;b.isItemLoaded&&!b.isItemLoaded(a)?b.loadItem({item:a,onItem:function(a){this._addOptionForItem(a)},scope:this}):this.addOption(this._getOptionObjForItem(a))},constructor:function(a){this._oValue=(a||{}).value||null;this._notifyConnections=[]},buildRendering:function(){this.inherited(arguments);f.setSelectable(this.focusNode,
!1)},_fillContent:function(){if(!this.options)this.options=this.srcNodeRef?q("> *",this.srcNodeRef).map(function(a){return"separator"===a.getAttribute("type")?{value:"",label:"",selected:!1,disabled:!1}:{value:a.getAttribute("data-"+n._scopeName+"-value")||a.getAttribute("value"),label:""+a.innerHTML,selected:a.getAttribute("selected")||!1,disabled:a.getAttribute("disabled")||!1}},this):[];this.value?this.multiple&&"string"==typeof this.value&&this._set("value",this.value.split(",")):this._set("value",
this._getValueFromOpts())},postCreate:function(){this.inherited(arguments);this.connect(this,"onChange","_updateSelection");var a=this.store;if(a&&(a.getIdentity||a.getFeatures()["dojo.data.api.Identity"]))this.store=null,this.setStore(a,this._oValue)},startup:function(){this._loadChildren();this.inherited(arguments)},destroy:function(){for(var a;a=this._notifyConnections.pop();)a.remove();this._queryRes&&this._queryRes.close&&this._queryRes.close();this.inherited(arguments)},_addOptionItem:function(){},
_removeOptionItem:function(){},_setDisplay:function(){},_getChildren:function(){return[]},_getSelectedOptionsAttr:function(){return this.getOptions(this.get("value"))},_pseudoLoadChildren:function(){},onSetStore:function(){}})})},"dojo/data/util/sorter":function(){define("dojo/data/util/sorter",["../../_base/lang"],function(b){var g={};b.setObject("dojo.data.util.sorter",g);g.basicComparator=function(b,c){var d=-1;null===b&&(b=void 0);null===c&&(c=void 0);if(b==c)d=0;else if(b>c||null==b)d=1;return d};
g.createSortFunction=function(b,c){function d(b,a,c,f){return function(e,d){var i=f.getValue(e,b),h=f.getValue(d,b);return a*c(i,h)}}for(var f=[],e,n=c.comparatorMap,i=g.basicComparator,q=0;q<b.length;q++){e=b[q];var k=e.attribute;if(k){e=e.descending?-1:1;var m=i;n&&("string"!==typeof k&&"toString"in k&&(k=k.toString()),m=n[k]||i);f.push(d(k,e,m,c))}}return function(b,a){for(var c=0;c<f.length;){var e=f[c++](b,a);if(0!==e)return e}return 0}};return g})},"dojo/store/util/QueryResults":function(){define("dojo/store/util/QueryResults",
["../../_base/array","../../_base/lang","../../_base/Deferred"],function(b,g,h){var c=function(d){function f(f){d[f]||(d[f]=function(){var g=arguments;return h.when(d,function(d){Array.prototype.unshift.call(g,d);return c(b[f].apply(b,g))})})}if(!d)return d;d.then&&(d=g.delegate(d));f("forEach");f("filter");f("map");if(!d.total)d.total=h.when(d,function(b){return b.length});return d};g.setObject("dojo.store.util.QueryResults",c);return c})},"dijit/form/_FormValueWidget":function(){define("dijit/form/_FormValueWidget",
["dojo/_base/declare","dojo/sniff","./_FormWidget","./_FormValueMixin"],function(b,g,h,c){return b("dijit.form._FormValueWidget",[h,c],{_layoutHackIE7:function(){if(7==g("ie"))for(var b=this.domNode,c=b.parentNode,e=b.firstChild||b,h=e.style.filter,i=this;c&&0==c.clientHeight;)(function(){var b=i.connect(c,"onscroll",function(){i.disconnect(b);e.style.filter=(new Date).getMilliseconds();i.defer(function(){e.style.filter=h})})})(),c=c.parentNode}})})},"dijit/form/_FormValueMixin":function(){define("dijit/form/_FormValueMixin",
["dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/sniff","./_FormWidgetMixin"],function(b,g,h,c,d){return b("dijit.form._FormValueMixin",d,{readOnly:!1,_setReadOnlyAttr:function(b){g.set(this.focusNode,"readOnly",b);this.focusNode.setAttribute("aria-readonly",b);this._set("readOnly",b)},postCreate:function(){this.inherited(arguments);c("ie")&&this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);if(void 0===this._resetValue)this._lastValueReported=this._resetValue=this.value},
_setValueAttr:function(b,c){this._handleOnChange(b,c)},_handleOnChange:function(b,c){this._set("value",b);this.inherited(arguments)},undo:function(){this._setValueAttr(this._lastValueReported,!1)},reset:function(){this._hasBeenBlurred=!1;this._setValueAttr(this._resetValue,!0)},_onKeyDown:function(b){if(b.keyCode==h.ESCAPE&&!b.ctrlKey&&!b.altKey&&!b.metaKey&&(9>c("ie")||c("ie")&&c("quirks"))){b.preventDefault();var e=b.srcElement,d=e.ownerDocument.createEventObject();d.keyCode=h.ESCAPE;d.shiftKey=
b.shiftKey;e.fireEvent("onkeypress",d)}}})})},"dijit/_Container":function(){define("dijit/_Container",["dojo/_base/array","dojo/_base/declare","dojo/dom-construct"],function(b,g,h){return g("dijit._Container",null,{buildRendering:function(){this.inherited(arguments);if(!this.containerNode)this.containerNode=this.domNode},addChild:function(b,d){var f=this.containerNode;if(d&&"number"==typeof d){var e=this.getChildren();if(e&&e.length>=d)f=e[d-1].domNode,d="after"}h.place(b.domNode,f,d);this._started&&
!b._started&&b.startup()},removeChild:function(b){"number"==typeof b&&(b=this.getChildren()[b]);if(b)(b=b.domNode)&&b.parentNode&&b.parentNode.removeChild(b)},hasChildren:function(){return 0<this.getChildren().length},_getSiblingOfChild:function(c,d){var f=this.getChildren(),e=b.indexOf(this.getChildren(),c);return f[e+d]},getIndexOfChild:function(c){return b.indexOf(this.getChildren(),c)}})})},"dojo/i18n":function(){define("dojo/i18n","./_base/kernel,require,./has,./_base/array,./_base/config,./_base/lang,./_base/xhr,./json,module".split(","),
function(b,g,h,c,d,f,e,n,i){h.add("dojo-preload-i18n-Api",1);var e=b.i18n={},q=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,k=function(a,b,c,d){for(var e=[c+d],b=b.split("-"),f="",h=0;h<b.length;h++)f+=(f?"-":"")+b[h],(!a||a[f])&&e.push(c+f+"/"+d);return e},m={},s=function(a,c,d){d=d?d.toLowerCase():b.locale;a=a.replace(/\./g,"/");c=c.replace(/\./g,"/");return/root/i.test(d)?a+"/nls/"+c:a+"/nls/"+d+"/"+c};b.getL10nName=function(a,b,c){return i.id+"!"+s(a,b,c)};var a=function(a,b,c,d,e,h){a([b],function(i){var g=
f.clone(i.root),j=k(!i._v1x&&i,e,c,d);a(j,function(){for(var a=1;a<j.length;a++)g=f.mixin(f.clone(g),arguments[a]);m[b+"/"+e]=g;h()})})},j=function(a){var b=d.extraLocale||[],b=f.isArray(b)?b:[b];b.push(a);return b},t=function(d,e,i){if(h("dojo-preload-i18n-Api")){var g=d.split("*"),k="preload"==g[1];k&&(m[d]||(m[d]=1,A(g[2],n.parse(g[3]),1,e)),i(1));if(!(g=k))r&&u.push([d,e,i]),g=r;if(g)return}var d=q.exec(d),l=d[1]+"/",o=d[5]||d[4],v=l+o,g=(d=d[5]&&d[4])||b.locale,B=v+"/"+g,d=d?[g]:j(g),C=d.length,
w=function(){--C||i(f.delegate(m[B]))};c.forEach(d,function(b){var c=v+"/"+b;h("dojo-preload-i18n-Api")&&p(c);m[c]?w():a(e,v,l,o,b,w)})};if(h("dojo-unit-tests"))var y=e.unitTests=[];h("dojo-preload-i18n-Api");var z=e.normalizeLocale=function(a){a=a?a.toLowerCase():b.locale;return"root"==a?"ROOT":a},r=0,u=[],A=e._preloadLocalizations=function(a,d,e,f){function h(a,b){f([a],b)}function i(a,b){for(var c=a.split("-");c.length;){if(b(c.join("-")))return;c.pop()}b("ROOT")}function j(b){b=z(b);i(b,function(b){if(0<=
c.indexOf(d,b)){var e=a.replace(/\./g,"/")+"_"+b;r++;h(e,function(a){for(var c in a)m[g.toAbsMid(c)+"/"+b]=a[c];for(--r;!r&&u.length;)t.apply(null,u.shift())});return!0}return!1})}f=f||g;j();c.forEach(b.config.extraLocale,j)},p=function(){},l={},o=new Function("__bundle","__checkForLegacyModules","__mid","__amdValue","var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},\t   require = function(){define.called = 1;};try{define.called = 0;eval(__bundle);if(define.called==1)return __amdValue;if((__checkForLegacyModules = __checkForLegacyModules(__mid)))return __checkForLegacyModules;}catch(e){}try{return eval('('+__bundle+')');}catch(e){return e;}"),
p=function(a){for(var c,d=a.split("/"),e=b.global[d[0]],f=1;e&&f<d.length-1;e=e[d[f++]]);e&&((c=e[d[f]])||(c=e[d[f].replace(/-/g,"_")]),c&&(m[a]=c));return c};e.getLocalization=function(a,b,c){var d,a=s(a,b,c);t(a,g,function(a){d=a});return d};h("dojo-unit-tests")&&y.push(function(a){a.register("tests.i18n.unit",function(a){var b;b=o("{prop:1}",p,"nonsense",l);a.is({prop:1},b);a.is(void 0,b[1]);b=o("({prop:1})",p,"nonsense",l);a.is({prop:1},b);a.is(void 0,b[1]);b=o("{'prop-x':1}",p,"nonsense",l);
a.is({"prop-x":1},b);a.is(void 0,b[1]);b=o("({'prop-x':1})",p,"nonsense",l);a.is({"prop-x":1},b);a.is(void 0,b[1]);b=o("define({'prop-x':1})",p,"nonsense",l);a.is(l,b);a.is({"prop-x":1},l.result);b=o("define('some/module', {'prop-x':1})",p,"nonsense",l);a.is(l,b);a.is({"prop-x":1},l.result);b=o("this is total nonsense and should throw an error",p,"nonsense",l);a.is(b instanceof Error,!0)})});return f.mixin(e,{dynamic:!0,normalize:function(a,b){return/^\./.test(a)?b(a):a},load:t,cache:m})})},"*now":function(b){b(['dojo/i18n!*preload*frontend/layer/nls/form-select*["ar","ca","cs","da","de","el","en-gb","en-us","es-es","fi-fi","fr-fr","he-il","hu","it-it","ja-jp","ko-kr","nl-nl","nb","pl","pt-br","pt-pt","ru","sk","sl","sv","th","tr","zh-tw","zh-cn","ROOT"]'])}}});
define("frontend/layer/form-select",[],1);