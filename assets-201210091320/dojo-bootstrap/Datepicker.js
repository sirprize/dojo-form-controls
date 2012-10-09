//>>built
define("dojo-bootstrap/Datepicker","dojo/_base/declare,dojo/query,dojo/_base/lang,dojo/_base/window,dojo/on,dojo/dom-class,dojo/dom-attr,dojo/dom-construct,dojo/dom-geometry,dojo/dom-style,dojo/_base/array,./Support,dojo/NodeList-dom,dojo/NodeList-traverse,dojo/domReady!".split(","),function(p,f,d,n,g,j,u,k,l,q,v,h){var m=[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],r="Su,Mo,Tu,We,Th,Fr,Sa,Su".split(","),
s="January,February,March,April,May,June,July,August,September,October,November,December".split(","),t="Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),o=p([],{defaultOptions:{},constructor:function(a,b){this.options=d.mixin(d.clone(this.defaultOptions),b||{});this.domNode=a;var c=b.format||h.getData(this.domNode,"date-format")||"mm/dd/yyyy",e=c.match(/[.\/-].*?/),c=c.split(/\W+/);if(!e||!c||0===c.length)throw Error("Invalid date format.");this.format={separator:e,parts:c};this.picker=
k.place('<div class="datepicker dropdown-menu"><div class="datepicker-days"><table class=" table-condensed"><thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead><tbody></tbody></table></div><div class="datepicker-months"><table class="table-condensed"><thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead><tbody><tr><td colspan="7"></td></tr></tbody></table></div><div class="datepicker-years"><table class="table-condensed"><thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead><tbody><tr><td colspan="7"></td></tr></tbody></table></div></div>',
document.body);f(this.picker).hide();this.pickerMouseDownEvent=g(this.picker,"mousedown",d.hitch(this,"mousedown"));this.pickerClickEvent=g(this.picker,"click",d.hitch(this,"click"));this.isInput="INPUT"===this.domNode.tagName||"TEXTAREA"===this.domNode.tagName;this.component=j.contains(this.domNode,"date")?f(".add-on",this.domNode)[0]:!1;this.isInput?(g(this.domNode,"focus",d.hitch(this,"show")),g(this.domNode,"click",d.hitch(this,"show")),g(this.domNode,"blur",d.hitch(this,"blur")),g(this.domNode,
"keyup",d.hitch(this,"update")),g(this.domNode,"keydown",d.hitch(this,"keydown"))):this.component?g(this.component,"click",d.hitch(this,"show")):g(this.domNode,"click",d.hitch(this,"show"));this.viewMode=0;this.weekStart=b.weekStart||h.getData(this.domNode,"date-weekstart")||0;this.weekEnd=0===this.weekStart?6:this.weekStart-1;this.fillDow();this.fillMonths();this.update();this.showMode()},show:function(a){f("div.datepicker.dropdown-menu").hide();f(this.picker).show();this.height=this.component?l.position(this.component,
!0).h:l.position(this.domNode,!0).h;this.place();this.resizeEvent=g(n.global,"resize",d.hitch(this,"place"));this.bodyClickEvent=g(n.body(),"click",d.hitch(this,"hide"));a&&(a.stopPropagation(),a.preventDefault());if(!this.isInput)this.docMouseDownEvent=g(document,"mousedown",d.hitch(this,"hide"));g.emit(this.domNode,"show",{bubbles:!0,cancelable:!0,type:"show",date:this.date})},hide:function(){f(this.picker).hide();this.resizeEvent.remove();this.viewMode=0;this.showMode();this.isInput||this.docMouseDownEvent.remove();
this.bodyClickEvent.remove();g.emit(this.domNode,"hide",{bubbles:!0,cancelable:!0,type:"hide",date:this.date})},setValue:function(){var a;a=this.date;var b=this.format,c={d:a.getDate(),m:a.getMonth()+1,yy:a.getFullYear().toString().substring(2),yyyy:a.getFullYear()};c.dd=(10>c.d?"0":"")+c.d;c.mm=(10>c.m?"0":"")+c.m;a=[];for(var e=0,d=b.parts.length;e<d;e++)a.push(c[b.parts[e]]);a=a.join(b.separator);if(this.isInput)this.domNode.value=a;else{if(this.component)f("input",this.domNode)[0].value=a;h.setData(this.domNode,
"date",a)}},place:function(){var a=this.component?l.position(this.component,!0):l.position(this.domNode,!0);q.set(this.picker,{top:a.y+this.domNode.offsetHeight+"px",left:a.x+"px"})},update:function(){var a=this.domNode.value,a=a?a:h.getData(this.domNode,"date"),b=this.format,c=new Date;a||(a="");var e=a.split(b.separator),a=new Date(c.getFullYear(),c.getMonth(),c.getDate(),0,0,0);if(e.length===b.parts.length)for(var f=0,d=b.parts.length;f<d;f++)switch(c=parseInt(e[f],10)||1,b.parts[f]){case "dd":case "d":a.setDate(c);
break;case "mm":case "m":a.setMonth(c-1);break;case "yy":a.setFullYear(2E3+c);break;case "yyyy":a.setFullYear(c)}this.date=a;this.viewDate=new Date(this.date);this.fill()},fillDow:function(){for(var a=this.weekStart,b="<tr>";a<this.weekStart+7;)b+='<th class="dow">'+r[a++%7]+"</th>";k.place(b+"</tr>",f(".datepicker-days thead",this.picker)[0])},fillMonths:function(){for(var a="",b=0;12>b;)a+='<span class="month" data-month="'+b+'">'+t[b++]+"</span>";k.place(a,f(".datepicker-months td",this.picker)[0])},
fill:function(){var a,b=[],c=new Date(this.viewDate),e=c.getFullYear(),d=c.getMonth(),g=this.date.valueOf(),c=this.date.getFullYear(),i=new Date(e,d-1,28,0,0,0,0);a=i.getFullYear();var h=i.getMonth();a=[31,0===a%4&&0!==a%100||0===a%400?29:28,31,30,31,30,31,31,30,31,30,31][h];f(".datepicker-days th.switch",this.picker)[0].innerHTML=s[d]+" "+e;i.setDate(a);i.setDate(a-(i.getDay()-this.weekStart+7)%7);h=new Date(i);h.setDate(h.getDate()+42);for(h=h.valueOf();i.valueOf()<h;)i.getDay()===this.weekStart&&
b.push("<tr>"),a="",i.getMonth()<d?a+=" old":i.getMonth()>d&&(a+=" new"),i.valueOf()===g&&(a+=" active"),b.push('<td class="day'+a+'">'+i.getDate()+"</td>"),i.getDay()===this.weekEnd&&b.push("</tr>"),i.setDate(i.getDate()+1);k.empty(f(".datepicker-days tbody",this.picker)[0]);k.place(b.join(" "),f(".datepicker-days tbody",this.picker)[0]);b=f(".datepicker-months",this.picker);f("th.switch",b[0])[0].innerHTML=e;f("span",b[0]).removeClass("active");c===e&&j.add(f("span",b[0])[this.date.getMonth()],
"active");b="";e=10*parseInt(e/10,10);d=f(".datepicker-years",this.picker);f("th.switch",d[0]).innerHTML=e+"-"+(e+9);d=f("td",d[0]);e-=1;for(g=-1;11>g;g++)b+='<span class="year'+(-1===g||10===g?" old":"")+(c===e?" active":"")+'">'+e+"</span>",e+=1;d[0].innerHTML=b},blur:function(){},click:function(a){a.stopPropagation();a.preventDefault()},mousedown:function(a){var b,c;a.stopPropagation();a.preventDefault();b=f(a.target).closest("span, td, th");if(1===b.length)switch(b[0].nodeName.toLowerCase()){case "th":switch(b[0].className){case "switch":this.showMode(1);
break;case "prev":case "next":this.viewDate["set"+m[this.viewMode].navFnc].call(this.viewDate,this.viewDate["get"+m[this.viewMode].navFnc].call(this.viewDate)+m[this.viewMode].navStep*("prev"===b[0].className?-1:1)),this.fill()}break;case "span":j.contains(b[0],"month")?(a=h.getData(b[0],"month"),this.viewDate.setMonth(a)):(b=parseInt(b[0].innerText||b[0].textContent,10)||0,this.viewDate.setFullYear(b));this.showMode(-1);this.fill();break;case "td":if(j.contains(b[0],"day"))c=parseInt(b[0].innerText||
b[0].textContent,10)||1,a=this.viewDate.getMonth(),j.contains(b[0],"old")?a-=1:j.contains(b[0],"new")&&(a+=1),b=this.viewDate.getFullYear(),this.date=new Date(b,a,c,0,0,0,0),this.viewDate=new Date(b,a,c,0,0,0,0),this.fill(),this.setValue(),g.emit(this.domNode,"changeDate",{bubbles:!1,cancelable:!1,date:this.date}),this.hide()}},keydown:function(a){9===(a.keyCode||a.which)&&this.hide()},showMode:function(a){if(a)this.viewMode=Math.max(0,Math.min(2,this.viewMode+a));f(">div",this.picker).hide();f(">div.datepicker-"+
m[this.viewMode].clsName,this.picker).show()},destroy:function(){h.removeData(this.domNode,"datepicker");this.nodeEvent.remove();k.destroy(this.picker)}});d.extend(f.NodeList,{datepicker:function(a){var b=d.isObject(a)?a:{};return this.forEach(function(c){var e=h.getData(c,"datepicker");e||h.setData(c,"datepicker",e=new o(c,b));d.isString(a)&&e[a].call(e)})}});return o});