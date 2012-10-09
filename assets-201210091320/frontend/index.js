//>>built
require({cache:{"dojo-bootstrap/Affix":function(){define("dojo-bootstrap/Affix","./Support,dojo/_base/declare,dojo/query,dojo/_base/lang,dojo/_base/window,dojo/on,dojo/dom-class,dojo/dom-construct,dojo/dom-attr,dojo/dom-style,dojo/dom-geometry,dojo/NodeList-dom,dojo/NodeList-traverse,dojo/domReady!".split(","),function(g,j,i,f,e,a,d,b,c,q,s){var x=j([],{defaultOptions:{offset:0},constructor:function(b,c){this.options=f.mixin(f.clone(this.defaultOptions),c||{});this.domNode=b;a(e.global,"scroll",f.hitch(this,
"checkPosition"));this.checkPosition()},checkPosition:function(){if("none"!==q.get(this.domNode,"display")){var a=s.position(this.domNode,!1),b=e.doc.height,c=e.global.scrollY,d=this.options.offset,f;"object"!==typeof d?d=f=d:(f="function"===typeof d.top?d.top():d.top||0,d="function"===typeof d.bottom?d.bottom():d.bottom||0);b=null!==this.unpin&&c+this.unpin<=a.y?!1:null!==d&&a.y+a.h>=b-d?"bottom":null!==f&&c<=f?"top":!1;if(this.affixed!==b)this.affixed=b,this.unpin="bottom"===b?a.y-c:null,i(this.domNode).removeClass("affix affix-top affix-bottom").addClass("affix"+
(b?"-"+b:""))}}});f.extend(i.NodeList,{affix:function(a){var b=f.isObject(a)?a:{};return this.forEach(function(c){var d=g.getData(c,"affix");d||g.setData(c,"affix",d=new x(c,b));f.isString(a)&&d[a].call(d)})}});i("[data-spy=affix]").forEach(function(a){var b=g.getData(a);b.offset=b.offset||{};if(b["offset-bottom"])b.offset.bottom=b["offset-bottom"];if(b["offset-top"])b.offset.top=b["offset-top"];i(a).affix(b)});return x})},"dojo-bootstrap/Support":function(){define("dojo-bootstrap/Support","dojo/query,dojo/_base/lang,dojo/dom-attr,dojo/_base/array,dojo/_base/json,dojo/NodeList-data".split(","),
function(g,j,i,f,e){j.extend(g.NodeList,{show:function(){return this.forEach(function(a){a.style.display="block"})},hide:function(){return this.forEach(function(a){a.style.display="none"})}});var a=function(a){var c=g(a)[0];if(c){var e=this;f.forEach(c.attributes,function(c){0<=c.name.indexOf("data-")&&e.setData(a,c.name.substr(5),d(c.value))})}},d=function(a){return!a?void 0:0===a.indexOf("{")&&a.indexOf("}")===a.length-1?e.fromJson(a):0===a.indexOf("[")&&a.indexOf("]")===a.length-1?e.fromJson(a):
a};return{trans:function(){var a;a:{a=document.createElement("bootstrap");var c={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"},d;for(d in c)if(void 0!==a.style[d]){a=c[d];break a}a=void 0}return a&&{end:a}}(),getData:function(b,c,e){c=c||void 0;e=e||void 0;if(void 0!==c&&j.isString(c)){var f=g(b).data(c);f&&void 0===f[0]&&(g(b)[0]&&(f=i.get(g(b)[0],"data-"+c)),void 0!==f&&(f=d(f)),void 0===f&&void 0!==e&&(f=this.setData(b,
c,e)));return j.isArray(f)&&0<f.length?f[0]:f}a.call(this,b);return g(b).data()[0]},setData:function(a,c,d){g(a).data(c,d);return d},removeData:function(a,c){return g(a).removeData(c)},toCamel:function(a){return a.replace(/(\-[a-z])/g,function(a){return a.toUpperCase().replace("-","")})},toDash:function(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})},toUnderscore:function(a){return a.replace(/([A-Z])/g,function(a){return"_"+a.toLowerCase()})}}})},"dojo/NodeList-data":function(){define("dojo/NodeList-data",
["./_base/kernel","./query","./_base/lang","./_base/array","./dom-attr"],function(g,j,i,f,e){var a=j.NodeList,d={},b=0,c=function(a){var c=e.get(a,"data-dojo-dataid");c||(c="pid"+b++,e.set(a,"data-dojo-dataid",c));return c},q=g._nodeData=function(a,b,e){var f=c(a),g;d[f]||(d[f]={});1==arguments.length&&(g=d[f]);"string"==typeof b?2<arguments.length?d[f][b]=e:g=d[f][b]:g=i.mixin(d[f],b);return g},s=g._removeNodeData=function(a,b){var e=c(a);d[e]&&(b?delete d[e][b]:delete d[e])};g._gcNodeData=function(){var a=
j("[data-dojo-dataid]").map(c),b;for(b in d)0>f.indexOf(a,b)&&delete d[b]};i.extend(a,{data:a._adaptWithCondition(q,function(a){return 0===a.length||1==a.length&&"string"==typeof a[0]}),removeData:a._adaptAsForEach(s)});return a})},"dojo/NodeList-traverse":function(){define("dojo/NodeList-traverse",["./query","./_base/lang","./_base/array"],function(g,j,i){var f=g.NodeList;j.extend(f,{_buildArrayFromCallback:function(e){for(var a=[],d=0;d<this.length;d++){var b=e.call(this[d],this[d],a);b&&(a=a.concat(b))}return a},
_getUniqueAsNodeList:function(e){for(var a=[],d=0,b;b=e[d];d++)1==b.nodeType&&-1==i.indexOf(a,b)&&a.push(b);return this._wrap(a,null,this._NodeListCtor)},_getUniqueNodeListWithParent:function(e,a){var d=this._getUniqueAsNodeList(e),d=a?g._filterResult(d,a):d;return d._stash(this)},_getRelatedUniqueNodes:function(e,a){return this._getUniqueNodeListWithParent(this._buildArrayFromCallback(a),e)},children:function(e){return this._getRelatedUniqueNodes(e,function(a){return j._toArray(a.childNodes)})},
closest:function(e,a){return this._getRelatedUniqueNodes(null,function(d){do if(g._filterResult([d],e,a).length)return d;while(d!=a&&(d=d.parentNode)&&1==d.nodeType);return null})},parent:function(e){return this._getRelatedUniqueNodes(e,function(a){return a.parentNode})},parents:function(e){return this._getRelatedUniqueNodes(e,function(a){for(var d=[];a.parentNode;)a=a.parentNode,d.push(a);return d})},siblings:function(e){return this._getRelatedUniqueNodes(e,function(a){for(var d=[],b=a.parentNode&&
a.parentNode.childNodes,c=0;c<b.length;c++)b[c]!=a&&d.push(b[c]);return d})},next:function(e){return this._getRelatedUniqueNodes(e,function(a){for(a=a.nextSibling;a&&1!=a.nodeType;)a=a.nextSibling;return a})},nextAll:function(e){return this._getRelatedUniqueNodes(e,function(a){for(var d=[];a=a.nextSibling;)1==a.nodeType&&d.push(a);return d})},prev:function(e){return this._getRelatedUniqueNodes(e,function(a){for(a=a.previousSibling;a&&1!=a.nodeType;)a=a.previousSibling;return a})},prevAll:function(e){return this._getRelatedUniqueNodes(e,
function(a){for(var d=[];a=a.previousSibling;)1==a.nodeType&&d.push(a);return d})},andSelf:function(){return this.concat(this._parent)},first:function(){return this._wrap(this[0]&&[this[0]]||[],this)},last:function(){return this._wrap(this.length?[this[this.length-1]]:[],this)},even:function(){return this.filter(function(e,a){return 0!=a%2})},odd:function(){return this.filter(function(e,a){return 0==a%2})}});return f})},"dijitive/ExpandingTextarea":function(){define("dijitive/ExpandingTextarea",["dojo/_base/declare",
"dojo/dom-attr","dijit/form/Textarea"],function(g,j,i){return g([i],{})})},"dijit/form/Textarea":function(){define("dijit/form/Textarea",["dojo/_base/declare","dojo/dom-style","./_ExpandingTextAreaMixin","./SimpleTextarea"],function(g,j,i,f){return g("dijit.form.Textarea",[f,i],{baseClass:"dijitTextBox dijitTextArea dijitExpandingTextArea",cols:"",buildRendering:function(){this.inherited(arguments);j.set(this.textbox,{overflowY:"hidden",overflowX:"auto",boxSizing:"border-box",MsBoxSizing:"border-box",
WebkitBoxSizing:"border-box",MozBoxSizing:"border-box"})}})})},"dijit/form/_ExpandingTextAreaMixin":function(){define("dijit/form/_ExpandingTextAreaMixin","dojo/_base/declare,dojo/dom-construct,dojo/has,dojo/_base/lang,dojo/on,dojo/_base/window,../Viewport".split(","),function(g,j,i,f,e,a,d){i.add("textarea-needs-help-shrinking",function(){var b=a.body(),c=j.create("textarea",{rows:"5",cols:"20",value:" ",style:{zoom:1,overflow:"hidden",visibility:"hidden",position:"absolute",border:"0px solid black",
padding:"0px"}},b,"last"),d=c.scrollHeight>=c.clientHeight;b.removeChild(c);return d});return g("dijit.form._ExpandingTextAreaMixin",null,{_setValueAttr:function(){this.inherited(arguments);this.resize()},postCreate:function(){this.inherited(arguments);var a=this.textbox;this.own(e(a,"scroll, focus",f.hitch(this,"_resizeLater")));a.style.overflowY="hidden";this._estimateHeight()},startup:function(){this.inherited(arguments);this.own(d.on("resize",f.hitch(this,"_resizeLater")));this._resizeLater()},
_onInput:function(a){this.inherited(arguments);this.resize()},_estimateHeight:function(){var a=this.textbox;a.style.height="auto";a.rows=(a.value.match(/\n/g)||[]).length+2},_resizeLater:function(){this.defer("resize")},resize:function(){function a(){var d=!1;if(""===c.value)c.value=" ",d=!0;var b=c.scrollHeight;if(d)c.value="";return b}var c=this.textbox;if("hidden"==c.style.overflowY)c.scrollTop=0;if(!this.busyResizing){this.busyResizing=!0;if(a()||c.offsetHeight){var d=c.style.height;if(!/px/.test(d))d=
a(),c.rows=1,c.style.height=d+"px";var d=Math.max(Math.max(c.offsetHeight,parseInt(d))-c.clientHeight,0)+a(),e=d+"px";if(e!=c.style.height)c.rows=1,c.style.height=e;if(i("textarea-needs-help-shrinking")){var f=a(),g=c.style.minHeight,j=4;c.style.minHeight=e;for(c.style.height="auto";0<d;){c.style.minHeight=Math.max(d-j,4)+"px";e=a();f-=e;d-=f;if(f<j)break;f=e;j<<=1}c.style.height=d+"px";c.style.minHeight=g}c.style.overflowY=a()>c.clientHeight?"auto":"hidden"}else this._estimateHeight();this.busyResizing=
!1}}})})},"dijit/Viewport":function(){define("dijit/Viewport","dojo/Evented,dojo/on,dojo/domReady,dojo/sniff,dojo/_base/window,dojo/window".split(","),function(g,j,i,f,e,a){var d=new g;i(function(){var b=a.getBox();d._rlh=j(e.global,"resize",function(){var c=a.getBox();b.h==c.h&&b.w==c.w||(b=c,d.emit("resize"))});if(8==f("ie")){var c=screen.deviceXDPI;setInterval(function(){if(screen.deviceXDPI!=c)c=screen.deviceXDPI,d.emit("resize")},500)}});return d})},"dojo/parser":function(){define("dojo/parser",
"require,./_base/kernel,./_base/lang,./_base/array,./_base/config,./_base/html,./_base/window,./_base/url,./_base/json,./aspect,./date/stamp,./Deferred,./has,./query,./on,./ready".split(","),function(g,j,i,f,e,a,d,b,c,q,s,x,D,y,B,w){function z(a){var c=a._nameCaseMap,d=a.prototype;if(!c||c._extendCnt<E){var c=a._nameCaseMap={},b;for(b in d)"_"!==b.charAt(0)&&(c[b.toLowerCase()]=b);c._extendCnt=E}return c}function F(a){var c=a.join();if(!u[c]){for(var b=[],d=0,e=a.length;d<e;d++){var f=a[d];b[b.length]=
u[f]=u[f]||i.getObject(f)||~f.indexOf("/")&&g(f)}a=b.shift();u[c]=b.length?a.createSubclass?a.createSubclass(b):a.extend.apply(a,b):a}return u[c]}var E=0;q.after(i,"extend",function(){E++},!0);var u={},H={_clearCache:function(){E++;u={}},_functionFromScript:function(a,c){var b="",d="",e=a.getAttribute(c+"args")||a.getAttribute("args"),g=a.getAttribute("with"),e=(e||"").split(/\s*,\s*/);g&&g.length&&f.forEach(g.split(/\s*,\s*/),function(a){b+="with("+a+"){";d+="}"});return new Function(e,b+a.innerHTML+
d)},instantiate:function(a,c,b){var c=c||{},b=b||{},d=(b.scope||j._scopeName)+"Type",e="data-"+(b.scope||j._scopeName)+"-",g=e+"type",i=e+"mixins",z=[];f.forEach(a,function(a){var b=d in c?c[d]:a.getAttribute(g)||a.getAttribute(d);if(b){var e=a.getAttribute(i),b=e?[b].concat(e.split(/\s*,\s*/)):[b];z.push({node:a,types:b})}});return this._instantiate(z,c,b)},_instantiate:function(a,c,b){a=f.map(a,function(a){var d=a.ctor||F(a.types);if(!d)throw Error("Unable to resolve constructor for: '"+a.types.join()+
"'");return this.construct(d,a.node,c,b,a.scripts,a.inherited)},this);!c._started&&!b.noStart&&f.forEach(a,function(a){"function"===typeof a.startup&&!a._started&&a.startup()});return a},construct:function(a,d,e,g,C,t){var I;var w=a&&a.prototype,g=g||{},o={};g.defaults&&i.mixin(o,g.defaults);t&&i.mixin(o,t);var v;D("dom-attributes-explicit")?v=d.attributes:D("dom-attributes-specified-flag")?v=f.filter(d.attributes,function(a){return a.specified}):(t=(/^input$|^img$/i.test(d.nodeName)?d:d.cloneNode(!1)).outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,
"").replace(/^\s*<[a-zA-Z0-9]*\s*/,"").replace(/\s*>.*$/,""),v=f.map(t.split(/\s+/),function(a){var c=a.toLowerCase();return{name:a,value:"LI"==d.nodeName&&"value"==a||"enctype"==c?d.getAttribute(c):d.getAttributeNode(c).value}}));var k=g.scope||j._scopeName,t="data-"+k+"-",l={};"dojo"!==k&&(l[t+"props"]="data-dojo-props",l[t+"type"]="data-dojo-type",l[t+"mixins"]="data-dojo-mixins",l[k+"type"]="dojoType",l[t+"id"]="data-dojo-id");for(var k=0,h,A=[],G,n;h=v[k++];){var m=h.name,p=m.toLowerCase();h=
h.value;switch(l[p]||p){case "data-dojo-type":case "dojotype":case "data-dojo-mixins":break;case "data-dojo-props":n=h;break;case "data-dojo-id":case "jsid":G=h;break;case "data-dojo-attach-point":case "dojoattachpoint":o.dojoAttachPoint=h;break;case "data-dojo-attach-event":case "dojoattachevent":o.dojoAttachEvent=h;break;case "class":o["class"]=d.className;break;case "style":o.style=d.style&&d.style.cssText;break;default:if(m in w||(m=z(a)[p]||m),m in w)switch(typeof w[m]){case "string":o[m]=h;
break;case "number":o[m]=h.length?Number(h):NaN;break;case "boolean":o[m]="false"!=h.toLowerCase();break;case "function":o[m]=""===h||-1!=h.search(/[^\w\.]+/i)?new Function(h):i.getObject(h,!1)||new Function(h);A.push(m);break;default:p=w[m],o[m]=p&&"length"in p?h?h.split(/\s*,\s*/):[]:p instanceof Date?""==h?new Date(""):"now"==h?new Date:s.fromISOString(h):p instanceof b?j.baseUrl+h:c.fromJson(h)}else o[m]=h}}for(k=0;k<A.length;k++)v=A[k].toLowerCase(),d.removeAttribute(v),d[v]=null;if(n)try{n=
c.fromJson.call(g.propsThis,"{"+n+"}"),i.mixin(o,n)}catch(x){throw Error(x.toString()+" in data-dojo-props='"+n+"'");}i.mixin(o,e);C||(C=a&&(a._noScript||w._noScript)?[]:y("> script[type^='dojo/']",d));e=[];g=[];n=[];A=[];if(C)for(k=0;k<C.length;k++){var r=C[k];d.removeChild(r);v=r.getAttribute(t+"event")||r.getAttribute("event");l=r.getAttribute(t+"prop");m=r.getAttribute(t+"method");p=r.getAttribute(t+"advice");h=r.getAttribute("type");r=this._functionFromScript(r,t);v?"dojo/connect"==h?e.push({method:v,
func:r}):"dojo/on"==h?A.push({event:v,func:r}):o[v]=r:"dojo/aspect"==h?e.push({method:m,advice:p,func:r}):"dojo/watch"==h?n.push({prop:l,func:r}):g.push(r)}I=(C=a.markupFactory||w.markupFactory)?C(o,d,a):new a(o,d),a=I;G&&i.setObject(G,a);for(k=0;k<e.length;k++)q[e[k].advice||"after"](a,e[k].method,i.hitch(a,e[k].func),!0);for(k=0;k<g.length;k++)g[k].call(a);for(k=0;k<n.length;k++)a.watch(n[k].prop,n[k].func);for(k=0;k<A.length;k++)B(a,A[k].event,A[k].func);return a},scan:function(a,c){function d(a){if(!a.inherited){a.inherited=
{};var c=a.node,b=d(a.parent),c={dir:c.getAttribute("dir")||b.dir,lang:c.getAttribute("lang")||b.lang,textDir:c.getAttribute(k)||b.textDir},e;for(e in c)c[e]&&(a.inherited[e]=c[e])}return a.inherited}var b=[],e=[],i={},z=(c.scope||j._scopeName)+"Type",B="data-"+(c.scope||j._scopeName)+"-",w=B+"type",k=B+"textdir",B=B+"mixins",l=a.firstChild,h=c.inherited;if(!h){var s=function(a,c){return a.getAttribute&&a.getAttribute(c)||a.parentNode&&s(a.parentNode,c)},h={dir:s(a,"dir"),lang:s(a,"lang"),textDir:s(a,
k)},q;for(q in h)h[q]||delete h[q]}for(var h={inherited:h},n,m;;)if(l)if(1!=l.nodeType)l=l.nextSibling;else if(n&&"script"==l.nodeName.toLowerCase())(p=l.getAttribute("type"))&&/^dojo\/\w/i.test(p)&&n.push(l),l=l.nextSibling;else if(m)l=l.nextSibling;else{var p=l.getAttribute(w)||l.getAttribute(z);q=l.firstChild;if(!p&&(!q||3==q.nodeType&&!q.nextSibling))l=l.nextSibling;else{m=null;if(p){var u=l.getAttribute(B);n=u?[p].concat(u.split(/\s*,\s*/)):[p];try{m=F(n)}catch(r){}m||f.forEach(n,function(a){~a.indexOf("/")&&
!i[a]&&(i[a]=!0,e[e.length]=a)});u=m&&!m.prototype._noScript?[]:null;h={types:n,ctor:m,parent:h,node:l,scripts:u};h.inherited=d(h);b.push(h)}else h={node:l,scripts:n,parent:h};l=q;n=u;m=m&&m.prototype.stopParser&&!c.template}}else{if(!h||!h.node)break;l=h.node.nextSibling;m=!1;h=h.parent;n=h.scripts}var y=new x;e.length?(D("dojo-debug-messages")&&console.warn("WARNING: Modules being Auto-Required: "+e.join(", ")),g(e,function(){y.resolve(f.filter(b,function(a){if(!a.ctor)try{a.ctor=F(a.types)}catch(d){}for(var b=
a.parent;b&&!b.types;)b=b.parent;var e=a.ctor&&a.ctor.prototype;a.instantiateChildren=!(e&&e.stopParser&&!c.template);a.instantiate=!b||b.instantiate&&b.instantiateChildren;return a.instantiate}))})):y.resolve(b);return y.promise},_require:function(a){var a=c.fromJson("{"+a.innerHTML+"}"),b=[],d=[],e=new x,f;for(f in a)b.push(f),d.push(a[f]);g(d,function(){for(var a=0;a<b.length;a++)i.setObject(b[a],arguments[a]);e.resolve(arguments)});return e.promise},_scanAmd:function(a){var c=new x,b=c.promise;
c.resolve(!0);var d=this;y("script[type='dojo/require']",a).forEach(function(a){b=b.then(function(){return d._require(a)});a.parentNode.removeChild(a)});return b},parse:function(c,b){var e;!b&&c&&c.rootNode?(b=c,e=b.rootNode):c&&i.isObject(c)&&!("nodeType"in c)?b=c:e=c;e=e?a.byId(e):d.body();var b=b||{},f=b.template?{template:!0}:{},g=[],j=this,z=this._scanAmd(e,b).then(function(){return j.scan(e,b)}).then(function(a){return g=g.concat(j._instantiate(a,f,b))}).otherwise(function(a){console.error("dojo/parser::parse() error",
a);throw a;});i.mixin(g,z);return g}};j.parser=H;e.parseOnLoad&&w(100,H,"parse");return H})},"dojo/_base/url":function(){define("dojo/_base/url",["./kernel"],function(g){var j=/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/,i=/^((([^\[:]+):)?([^@]+)@)?(\[([^\]]+)\]|([^\[:]*))(:([0-9]+))?$/,f=function(){for(var e=arguments,a=[e[0]],d=1;d<e.length;d++)if(e[d]){var b=new f(e[d]+""),a=new f(a[0]+"");if(""==b.path&&!b.scheme&&!b.authority&&!b.query){if(null!=b.fragment)a.fragment=b.fragment;
b=a}else if(!b.scheme&&(b.scheme=a.scheme,!b.authority&&(b.authority=a.authority,"/"!=b.path.charAt(0)))){for(var a=(a.path.substring(0,a.path.lastIndexOf("/")+1)+b.path).split("/"),c=0;c<a.length;c++)"."==a[c]?c==a.length-1?a[c]="":(a.splice(c,1),c--):0<c&&!(1==c&&""==a[0])&&".."==a[c]&&".."!=a[c-1]&&(c==a.length-1?(a.splice(c,1),a[c-1]=""):(a.splice(c-1,2),c-=2));b.path=a.join("/")}a=[];b.scheme&&a.push(b.scheme,":");b.authority&&a.push("//",b.authority);a.push(b.path);b.query&&a.push("?",b.query);
b.fragment&&a.push("#",b.fragment)}this.uri=a.join("");e=this.uri.match(j);this.scheme=e[2]||(e[1]?"":null);this.authority=e[4]||(e[3]?"":null);this.path=e[5];this.query=e[7]||(e[6]?"":null);this.fragment=e[9]||(e[8]?"":null);if(null!=this.authority)e=this.authority.match(i),this.user=e[3]||null,this.password=e[4]||null,this.host=e[6]||e[7],this.port=e[9]||null};f.prototype.toString=function(){return this.uri};return g._Url=f})},"dojo/date/stamp":function(){define("dojo/date/stamp",["../_base/lang",
"../_base/array"],function(g,j){var i={};g.setObject("dojo.date.stamp",i);i.fromISOString=function(f,e){if(!i._isoRegExp)i._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;var a=i._isoRegExp.exec(f),d=null;if(a){a.shift();a[1]&&a[1]--;a[6]&&(a[6]*=1E3);e&&(e=new Date(e),j.forEach(j.map("FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds".split(","),function(a){return e["get"+a]()}),function(c,b){a[b]=a[b]||c}));d=new Date(a[0]||
1970,a[1]||0,a[2]||1,a[3]||0,a[4]||0,a[5]||0,a[6]||0);100>a[0]&&d.setFullYear(a[0]||1970);var b=0,c=a[7]&&a[7].charAt(0);"Z"!=c&&(b=60*(a[8]||0)+(Number(a[9])||0),"-"!=c&&(b*=-1));c&&(b-=d.getTimezoneOffset());b&&d.setTime(d.getTime()+6E4*b)}return d};i.toISOString=function(f,e){var a=function(a){return 10>a?"0"+a:a},e=e||{},d=[],b=e.zulu?"getUTC":"get",c="";"time"!=e.selector&&(c=f[b+"FullYear"](),c=["0000".substr((c+"").length)+c,a(f[b+"Month"]()+1),a(f[b+"Date"]())].join("-"));d.push(c);if("date"!=
e.selector){c=[a(f[b+"Hours"]()),a(f[b+"Minutes"]()),a(f[b+"Seconds"]())].join(":");b=f[b+"Milliseconds"]();e.milliseconds&&(c+="."+(100>b?"0":"")+a(b));if(e.zulu)c+="Z";else if("time"!=e.selector)var b=f.getTimezoneOffset(),g=Math.abs(b),c=c+((0<b?"-":"+")+a(Math.floor(g/60))+":"+a(g%60));d.push(c)}return d.join("T")};return i})}}});
require("dojo-bootstrap/Affix,dijitive/Button,dijitive/Checkbox,dijitive/Radio,dijitive/Select,dijitive/Textarea,dijitive/ExpandingTextarea,dijitive/Textbox,dijit/registry,dojo/dom-geometry,dojo/ready,dojo/on,dojo/query,dojo/parser,dojo/domReady!".split(","),function(g,j,i,f,e,a,d,b,c,q,s,x,D,y){y.parse();hljs.initHighlightingOnLoad();D(".bs-docs-sidenav").affix({offset:{top:function(){return 980>=document.width?245:195},bottom:270}});(new j({type:"submit","class":"btn btn-primary",label:'<i class="icon-music icon-white"></i> La La Laaaa',
onClick:function(){console.info("Clicked");return!1}},"button1")).startup();c.byId("button2").onClick=function(){console.info("Clicked");return!1};(new i({name:"menu",value:"clam chowder",checked:!0,onChange:function(){console.info("New value is: "+this.get("value"))}},"checkbox1")).startup();c.byId("checkbox2").onChange=function(){console.info("New value is: "+this.get("value"))};(new f({name:"size",value:"large",onChange:function(){console.info("New value is: "+this.get("value"))}},"radio1")).startup();
(new f({name:"size",value:"small",checked:!0,onChange:function(){console.info("New value is: "+this.get("value"))}},"radio2")).startup();c.byId("radio3").onChange=function(){console.info("New value is: "+this.get("value"))};c.byId("radio4").onChange=function(){console.info("New value is: "+this.get("value"))};g=[{value:"",label:"Please select"},{value:"steak-and-lobster",label:"Steak & Lobster"},{value:"clam-chowder",label:"Clam chowder"},{value:"pizza",label:"Pizza",disabled:!0},{value:"pasta",label:"Pasta"}];
j=new e({name:"meal1",value:"pasta",options:g,required:!0,onChange:function(a){console.info("select.onChange(): "+a)}},"select1");j.watch("value",function(a,c,b){console.info('select.watch("value")',a,c,b)});j.watch("message",function(a,c,b){console[b?"error":"info"]('select.watch("message"):',b)});j.startup();e=new e({multiple:!0,name:"meal2",value:["steak-and-lobster","clam-chowder"],options:g,required:!0,onChange:function(a){console.info("select.onChange(): "+a)}},"select2");e.watch("value",function(a,
c,b){console.info('select.watch("value")',a,c,b)});e.watch("message",function(a,c,b){console[b?"error":"info"]('select.watch("message"):',b)});e.startup();s(function(){c.byId("select3").onChange=function(a){console.info("select.onChange(): "+a)};c.byId("select3").watch("value",function(a,c,b){console.info('select.watch("value")',a,c,b)});c.byId("select3").watch("message",function(a,c,b){console[b?"error":"info"]('select.watch("message"):',b)});c.byId("select4").onChange=function(a){console.info("select.onChange(): "+
a)};c.byId("select4").watch("value",function(a,c,b){console.info('select.watch("value")',a,c,b)});c.byId("select4").watch("message",function(a,c,b){console[b?"error":"info"]('select.watch("message"):',b)})});a=new a({name:"note",autocomplete:!1,uppercase:!0,trim:!0,onKeyPress:function(){console.info("Key pressed")}},"textarea1");a.startup();a.watch("value",function(a,c,b){console.info('New value is "'+b)});s(function(){c.byId("textarea2").onKeyPress=function(){console.info("Key pressed")};c.byId("textarea2").watch("value",
function(a,b,c){console.info('select.watch("value")',a,b,c)})});d=new d({name:"note",autocomplete:!1,uppercase:!0,trim:!0,onKeyPress:function(){console.info("Key pressed")}},"expandingTextarea1");d.startup();d.watch("value",function(a,b,c){console.info('New value is "'+c)});s(function(){c.byId("expandingTextarea2").onKeyPress=function(){console.info("Key pressed")};c.byId("expandingTextarea2").watch("value",function(a,c,b){console.info('select.watch("value")',a,c,b)})});b=new b({name:"title",placeHolder:"Your title",
autocomplete:!1,uppercase:!0,trim:!0,onKeyPress:function(){console.info("Key pressed")}},"textbox1");b.startup();b.watch("value",function(a,c,b){console.info('New value is "'+b)});s(function(){c.byId("textbox2").onKeyPress=function(){console.info("Key pressed")};c.byId("textbox2").watch("value",function(a,b,c){console.info('select.watch("value")',a,b,c)})})});