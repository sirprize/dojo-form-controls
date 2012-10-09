//>>built
define("dojo/on",["./has!dom-addeventlistener?:./aspect","./_base/kernel","./has"],function(s,t,e){function u(a,c,b,d,h){if(d=c.match(/(.*):(.*)/))return c=d[2],d=d[1],f.selector(d,c).call(h,a,b);e("touch")&&(v.test(c)&&(b=l(b)),!e("event-orientationchange")&&"orientationchange"==c&&(c="resize",a=window,b=l(b)));m&&(b=m(b));if(a.addEventListener){var g=c in k,i=g?k[c]:c;a.addEventListener(i,b,g);return{remove:function(){a.removeEventListener(i,b,g)}}}if(n&&a.attachEvent)return n(a,"on"+c,b);throw Error("Target must be an event emitter");
}function w(){this.cancelable=!1}function x(){this.bubbles=!1}var o=window.ScriptEngineMajorVersion;e.add("jscript",o&&o()+ScriptEngineMinorVersion()/10);e.add("event-orientationchange",e("touch")&&!e("android"));e.add("event-stopimmediatepropagation",window.Event&&!!window.Event.prototype&&!!window.Event.prototype.stopImmediatePropagation);var f=function(a,c,b,d){return"function"==typeof a.on&&"function"!=typeof c?a.on(c,b):f.parse(a,c,b,u,d,this)};f.pausable=function(a,c,b,d){var h,a=f(a,c,function(){if(!h)return b.apply(this,
arguments)},d);a.pause=function(){h=!0};a.resume=function(){h=!1};return a};f.once=function(a,c,b){var d=f(a,c,function(){d.remove();return b.apply(this,arguments)});return d};f.parse=function(a,c,b,d,h,g){if(c.call)return c.call(g,a,b);if(-1<c.indexOf(",")){for(var c=c.split(/\s*,\s*/),i=[],f=0,e;e=c[f++];)i.push(d(a,e,b,h,g));i.remove=function(){for(var a=0;a<i.length;a++)i[a].remove()};return i}return d(a,c,b,h,g)};var v=/^touch/;f.selector=function(a,c,b){return function(d,h){function g(c){for(i=
i&&i.matches?i:t.query;!i.matches(c,a,d);)if(c==d||!1===b||!(c=c.parentNode)||1!=c.nodeType)return;return c}var i="function"==typeof a?{matches:a}:this,e=c.bubble;return e?f(d,e(g),h):f(d,c,function(a){var b=g(a.target);return b&&h.call(b,a)})}};var y=[].slice,z=f.emit=function(a,c,b){var d=y.call(arguments,2),h="on"+c;if("parentNode"in a){var g=d[0]={},e;for(e in b)g[e]=b[e];g.preventDefault=w;g.stopPropagation=x;g.target=a;g.type=c;b=g}do a[h]&&a[h].apply(a,d);while(b&&b.bubbles&&(a=a.parentNode));
return b&&b.cancelable&&b},k={};if(!e("event-stopimmediatepropagation"))var A=function(){this.modified=this.immediatelyStopped=!0},m=function(a){return function(c){if(!c.immediatelyStopped)return c.stopImmediatePropagation=A,a.apply(this,arguments)}};if(e("dom-addeventlistener")){k={focusin:"focus",focusout:"blur"};if(e("opera"))k.keydown="keypress";f.emit=function(a,c,b){if(a.dispatchEvent&&document.createEvent){var d=a.ownerDocument.createEvent("HTMLEvents");d.initEvent(c,!!b.bubbles,!!b.cancelable);
for(var e in b)e in d||(d[e]=b[e]);return a.dispatchEvent(d)&&d}return z.apply(f,arguments)}}else{f._fixEvent=function(a,c){if(!a)a=(c&&(c.ownerDocument||c.document||c).parentWindow||window).event;if(!a)return a;j&&a.type==j.type&&(a=j);if(!a.target){a.target=a.srcElement;a.currentTarget=c||a.srcElement;if("mouseover"==a.type)a.relatedTarget=a.fromElement;if("mouseout"==a.type)a.relatedTarget=a.toElement;if(!a.stopPropagation)a.stopPropagation=B,a.preventDefault=C;switch(a.type){case "keypress":var b=
"charCode"in a?a.charCode:a.keyCode;10==b?(b=0,a.keyCode=13):13==b||27==b?b=0:3==b&&(b=99);a.charCode=b;b=a;b.keyChar=b.charCode?String.fromCharCode(b.charCode):"";b.charOrCode=b.keyChar||b.keyCode}}return a};var j,p=function(a){this.handle=a};p.prototype.remove=function(){delete _dojoIEListeners_[this.handle]};var D=function(a){return function(c){var c=f._fixEvent(c,this),b=a.call(this,c);c.modified&&(j||setTimeout(function(){j=null}),j=c);return b}},n=function(a,c,b){b=D(b);if(((a.ownerDocument?
a.ownerDocument.parentWindow:a.parentWindow||a.window||window)!=top||5.8>e("jscript"))&&!e("config-_allow_leaks")){"undefined"==typeof _dojoIEListeners_&&(_dojoIEListeners_=[]);var d=a[c];if(!d||!d.listeners){var f=d,d=Function("event","var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}");d.listeners=[];a[c]=d;d.global=this;f&&d.listeners.push(_dojoIEListeners_.push(f)-1)}d.listeners.push(a=
d.global._dojoIEListeners_.push(b)-1);return new p(a)}return s.after(a,c,b,!0)},B=function(){this.cancelBubble=!0},C=f._preventDefault=function(){this.bubbledKeyCode=this.keyCode;if(this.ctrlKey)try{this.keyCode=0}catch(a){}this.defaultPrevented=!0;this.returnValue=!1}}if(e("touch"))var q=function(){},r=window.orientation,l=function(a){return function(c){var b=c.corrected;if(!b){var d=c.type;try{delete c.type}catch(e){}c.type?(q.prototype=c,b=new q,b.preventDefault=function(){c.preventDefault()},
b.stopPropagation=function(){c.stopPropagation()}):(b=c,b.type=d);c.corrected=b;if("resize"==d){if(r==window.orientation)return null;r=window.orientation;b.type="orientationchange";return a.call(this,b)}if(!("rotation"in b))b.rotation=0,b.scale=1;var d=b.changedTouches[0],f;for(f in d)delete b[f],b[f]=d[f]}return a.call(this,b)}};return f});