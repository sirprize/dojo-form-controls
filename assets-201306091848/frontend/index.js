//>>built
require({cache:{"dobolo/Affix":function(){define("dojo/_base/declare dojo/_base/lang dojo/_base/window dojo/on dojo/dom-class dojo/dom-style dojo/dom-geometry".split(" "),function(a,b,e,d,k,g,l){return a([],{offsetTop:0,offsetBottom:0,affixed:null,unpin:null,scroller:null,constructor:function(f,c){f=f||{};this.node=c;this.offsetTop=f.offsetTop||0;this.offsetBottom=f.offsetBottom||0;this.scroller=d(e.doc,"scroll",b.hitch(this,"checkPosition"));this.checkPosition()},checkPosition:function(){if("none"!==
g.get(this.node,"display")){var f=l.position(this.node,!1),c=e.doc.height,a=e.global.scrollY,b,d;b="function"===typeof this.offsetTop?this.offsetTop():this.offsetTop;d="function"===typeof this.offsetBottom?this.offsetBottom():this.offsetBottom;c=null!==this.unpin&&a+this.unpin<=f.y?!1:null!==d&&f.y+f.h>=c-d?"bottom":null!==b&&a<=b?"top":!1;this.affixed!==c&&(this.affixed=c,this.unpin="bottom"===c?f.y-a:null,k.remove(this.node,"affix affix-top affix-bottom"),k.add(this.node,"affix"+(c?"-"+c:"")))}},
destroy:function(){this.scroller&&this.scroller.remove&&this.scroller.remove()}})})},"dobolo/ScrollSpy":function(){define("dojo/_base/declare ./ScrollTopSpyHelper dojo/_base/window dojo/dom-class dojo/dom-attr dojo/query dojo/on".split(" "),function(a,b,e,d,k,g,l){return a([],{helper:null,handle:null,constructor:function(a,c){a=a||{};c=!c||c&&"BODY"===c.tagName?e.doc:c;var l=a.offsetsSelector?g(a.offsetsSelector,c):[],n=a.targetSelector?a.targetSelector:null;this.helper=new b(c,l,a.offsetTop||0,a.wait||
100);this.handle=this.helper.on("active",function(a){g(n+" li").forEach(function(c){g("\x3e a",c).forEach(function(b){b=(k.get(b,"href")||"").replace(/^#/,"");d[b===a.node.id?"add":"remove"](c,"active")})})})},destroy:function(){this.helper.destroy();this.handle&&this.handle.remove&&this.handle.remove()}})})},"dobolo/ScrollTopSpyHelper":function(){define("dojo/_base/declare dojo/Evented dojo/dom-geometry dojo/_base/lang dojo/_base/window dojo/dom dojo/on ./Util".split(" "),function(a,b,e,d,k,g,l,
f){return a([b],{scroller:null,constructor:function(a,b,g,p){var h;g=g||0;var m=null,q=f.throttle(function(b){var d=a===k.doc?0:e.position(a).y;for(h=b.length-1;0<=h;h-=1)if(e.position(b[h],!1).y<=0+g+d){if(m===b[h])break;m=b[h];this.emit("active",{bubbles:!0,cancelable:!0,node:b[h]});break}},p||100,this);this.scroller=l(a,"scroll",d.hitch(this,function(a){node=q(b)}))},destroy:function(){this.scroller&&this.scroller.remove&&this.scroller.remove()}})})},"dobolo/Util":function(){define([],function(){return{transition:function(){var a;
a:{a=document.createElement("bootstrap");var b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"},e;for(e in b)if(void 0!==a.style[e]){a=b[e];break a}a=void 0}return a&&{end:a}}(),throttle:function(a,b,e){var d=!0;return function(){d&&(d=!1,a.apply(e||a,arguments),setTimeout(function(){d=!0},b))}}}})}}});require(["dojo/parser","dojo/domReady!"],function(a){window.prettyPrint&&prettyPrint()});
//@ sourceMappingURL=index.js.map