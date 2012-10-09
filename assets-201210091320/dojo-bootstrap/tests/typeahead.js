//>>built
require({packages:[{name:"dojo",location:"../dojo"},{name:"bootstrap",location:"../bootstrap"}]},"doh,dojo/on,dojo/_base/sniff,dojo/dom-construct,dojo/dom-class,../Support,../Typeahead".split(","),function(c,f,h,a,g,e){var b=dojo.query;c.register("bootstrap.typeahead",{"should be defined on NodeList object":function(){c.t(b(document.body).typeahead)},"should return element":function(){c.is(document.body,b(document.body).typeahead()[0])},"should create a menu":{setUp:function(){this.c=a.place("<input />",
document.body);b(this.c).typeahead()},runTest:function(){c.t(e.getData(this.c,"typeahead").menuNode)},tearDown:function(){a.destroy(this.c)}},"should show menu when query entered":{setUp:function(){this.c=a.place("<input />",document.body);b(this.c).typeahead({source:["aa","ab","ac"]});this.t=e.getData(this.c,"typeahead");this.c.value="a";this.t.lookup()},runTest:function(){var d=this.t.menuNode;c.is(1,b(":visible",d).length);c.is(3,b("li",d).length);c.is(1,b(".active",d).length)},tearDown:function(){a.destroy(this.t.menuNode);
a.destroy(this.c)}},"should not explode when regex chars are entered":{setUp:function(){this.c=a.place("<input />",document.body);b(this.c).typeahead({source:["aa","ab","ac","mdo*","fat+"]});this.t=e.getData(this.c,"typeahead");this.c.value="+";this.t.lookup()},runTest:function(){var d=this.t.menuNode;c.is(1,b(":visible",d).length);c.is(1,b("li",d).length);c.is(1,b(".active",d).length)},tearDown:function(){a.destroy(this.t.menuNode);a.destroy(this.c)}},"should hide menu when query entered":{setUp:function(){this.c=
a.place("<input />",document.body);b(this.c).typeahead({source:["aa","ab","ac"]});this.t=e.getData(this.c,"typeahead");this.c.value="a";this.t.lookup()},runTest:function(){var d=this.t.menuNode;c.is(1,b(":visible",d).length);c.is(1,b("li",d).length);c.is(1,b(".active",d).length);f.emit(this.c,"blur",{bubbles:!0,cancelable:!0});var a=new c.Deferred;setTimeout(a.getTestCallback(function(){c.is(0,b(":visible",d).length)}));return a},tearDown:function(){a.destroy(this.t.menuNode);a.destroy(this.c)}},
"should set input value to selected item":{setUp:function(){this.c=a.place("<input />",document.body);b(this.c).typeahead({source:["aa","ab","ac"]});this.t=e.getData(this.c,"typeahead");this.c.value="a";this.t.lookup()},runTest:function(){var d=!1;f(this.c,"change",function(){d=!0});var a=this.t.menuNode;f.emit(b("li",a)[2],"click",{bubbles:!0,cancelable:!0});c.is("ac",this.c.value);c.is(0,b(":visible",a).length);c.t(d)},tearDown:function(){a.destroy(this.t.menuNode);a.destroy(this.c)}},"should set next item when down arrow is pressed":{setUp:function(){this.c=
a.place("<input />",document.body);b(this.c).typeahead({source:["aa","ab","ac"]});this.t=e.getData(this.c,"typeahead");this.c.value="a";this.t.lookup()},runTest:function(){var a=this.t.menuNode;c.is(1,b(":visible",a).length);c.is(3,b("li",a).length);c.is(1,b(".active",a).length);c.t(g.contains(b("li",a)[0],"active"));f.emit(this.c,"keydown",{bubbles:!0,cancelable:!0,keyCode:40});c.t(g.contains(b("li",a)[1],"active"));f.emit(this.c,"keydown",{bubbles:!0,cancelable:!0,keyCode:38});c.t(g.contains(b("li",
a)[0],"active"))},tearDown:function(){a.destroy(this.t.menuNode);a.destroy(this.c)}}})});