//>>built
define("dojo/data/util/simpleFetch",["../../_base/lang","../../_base/kernel","./sorter"],function(d,h,j){var c={};d.setObject("dojo.data.util.simpleFetch",c);c.errorHandler=function(b,a){a.onError&&a.onError.call(a.scope||h.global,b,a)};c.fetchHandler=function(b,a){var c=a.abort||null,d=!1,f=a.start?a.start:0,i=a.count&&Infinity!==a.count?f+a.count:b.length;a.abort=function(){d=!0;c&&c.call(a)};var g=a.scope||h.global;if(!a.store)a.store=this;a.onBegin&&a.onBegin.call(g,b.length,a);a.sort&&b.sort(j.createSortFunction(a.sort,
this));if(a.onItem)for(var e=f;e<b.length&&e<i;++e){var k=b[e];d||a.onItem.call(g,k,a)}a.onComplete&&!d&&(e=null,a.onItem||(e=b.slice(f,i)),a.onComplete.call(g,e,a))};c.fetch=function(b){b=b||{};if(!b.store)b.store=this;this._fetchItems(b,d.hitch(this,"fetchHandler"),d.hitch(this,"errorHandler"));return b};return c});