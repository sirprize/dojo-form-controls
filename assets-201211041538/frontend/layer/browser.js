//>>built
require({cache:{"dojo/ready":function(){define("dojo/ready",["./_base/kernel","./has","require","./domReady","./_base/lang"],function(b,e,c,a,h){var l=0,f,d=[],i=0,j=function(){if(l&&!i&&d.length){i=1;var b=d.shift();try{a(b)}finally{i=0}i=0;d.length&&f(j)}};c.on("idle",j);f=function(){c.idle()&&j()};var e=b.ready=b.addOnLoad=function(a,e,c){var g=h._toArray(arguments);"number"!=typeof a?(c=e,e=a,a=1E3):g.shift();c=c?h.hitch.apply(b,g):function(){e()};c.priority=a;for(g=0;g<d.length&&a>=d[g].priority;g++);
d.splice(g,0,c);f()},k=b.config.addOnLoad;if(k)e[h.isArray(k)?"apply":"call"](b,k);a(function(){l=1;b._postLoad=b.config.afterOnLoad=!0;d.length&&f(j)});return e})},"dojo/domReady":function(){define("dojo/domReady",["./has"],function(b){function e(g){f&&(!d||!d.length)?g(a):d.push(g)}var c=this,a=document,h={loaded:1,complete:1},l="string"!=typeof a.readyState,f=!!h[a.readyState];if(l)a.readyState="loading";if(!f){var d=[],i=[],j=function(g){g=g||c.event;if(!(f||"readystatechange"==g.type&&!h[a.readyState])){f=
1;if(l)a.readyState="complete";for(;d.length;)d.shift()(a)}},k=function(a,b){a.addEventListener(b,j,!1);d.push(function(){a.removeEventListener(b,j,!1)})};if(!b("dom-addeventlistener")){var k=function(a,b){b="on"+b;a.attachEvent(b,j);d.push(function(){a.detachEvent(b,j)})},m=a.createElement("div");try{m.doScroll&&null===c.frameElement&&i.push(function(){try{return m.doScroll("left"),1}catch(a){}})}catch(o){}}k(a,"DOMContentLoaded");k(c,"load");"onreadystatechange"in a?k(a,"readystatechange"):l||i.push(function(){return h[a.readyState]});
if(i.length){var n=function(){if(!f){for(var a=i.length;a--;)if(i[a]()){j("poller");return}setTimeout(n,30)}};n()}}e.load=function(a,b,c){e(c)};return e})},"dojo/_base/unload":function(){define("dojo/_base/unload",["./kernel","./lang","../on"],function(b,e,c){var a=window,h={addOnWindowUnload:function(h,f){if(!b.windowUnloaded)c(a,"unload",b.windowUnloaded=function(){});c(a,"unload",e.hitch(h,f))},addOnUnload:function(b,f){c(a,"beforeunload",e.hitch(b,f))}};b.addOnWindowUnload=h.addOnWindowUnload;
b.addOnUnload=h.addOnUnload;return h})}}});define("frontend/layer/browser",[],1);