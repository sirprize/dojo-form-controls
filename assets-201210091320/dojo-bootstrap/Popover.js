//>>built
define("dojo-bootstrap/Popover","dojo/_base/declare,./Support,./Tooltip,dojo/query,dojo/_base/lang,dojo/on,dojo/dom-class,dojo/dom-construct,dojo/dom-attr,dojo/html,dojo/NodeList-dom,dojo/NodeList-manipulate,dojo/domReady!".split(","),function(i,f,j,g,d,n,k,l,m){var h=i(j,{"-chains-":{constructor:"manual"},constructor:function(a,b){b=d.mixin({placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'},
b||{});this.init("popover",a,b)},setContent:function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();g(".popover-title",a)[this.options.html?"html":"text"](b);g(".popover-content > *",a)[this.options.html?"html":"text"](c);k.remove(a,"fade in top bottom left right")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){return m.get(this.domNode,"data-content")||("function"===typeof this.options.content?this.options.content.call(this.domNode):this.options.content)},
tip:function(){return this.tipNode=this.tipNode?this.tipNode:l.toDom(this.options.template)},destroy:function(){this.hide();this.eventActivate&&this.eventActivate.remove();this.eventDeactivate&&this.eventDeactivate.remove();f.removeData(this.domNode,"popover")}});d.extend(g.NodeList,{popover:function(a){var b=d.isObject(a)?a:{};return this.forEach(function(c){var e=f.getData(c,"popover");e||f.setData(c,"popover",e=new h(c,b));d.isString(a)&&e[a].call(e)})}});return h});