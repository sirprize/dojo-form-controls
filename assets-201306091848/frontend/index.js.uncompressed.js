require({cache:{
'dobolo/Affix':function(){
define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/on',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/dom-geometry'
], function (
    declare,
    lang,
    win,
    on,
    domClass,
    domStyle,
    domGeom
) {
    return declare([], {
        
        offsetTop: 0,
        offsetBottom: 0,
        affixed: null,
        unpin: null,
        scroller: null,
        
        constructor: function (props, node) {
            props = props || {};
            this.node = node;
            this.offsetTop = props.offsetTop || 0;
            this.offsetBottom = props.offsetBottom || 0;
            this.scroller = on(win.doc, 'scroll', lang.hitch(this, 'checkPosition'));
            this.checkPosition();
        },
        
        checkPosition: function () {
            if (domStyle.get(this.node, 'display') === 'none') { return; }

            var pos = domGeom.position(this.node, false),
                scrollHeight = win.doc.height,
                scrollTop = win.global.scrollY,
                reset = 'affix affix-top affix-bottom',
                affix,
                offsetTop, 
                offsetBottom;
            
            if (typeof this.offsetTop === 'function') { 
                offsetTop = this.offsetTop(); 
            } else {
                offsetTop = this.offsetTop;
            }
            
            if (typeof this.offsetBottom === 'function') { 
                offsetBottom = this.offsetBottom(); 
            } else {
                offsetBottom = this.offsetBottom;
            }

            affix = this.unpin !== null && (scrollTop + this.unpin <= pos.y) ?
                false    : offsetBottom !== null && (pos.y + pos.h >= scrollHeight - offsetBottom) ?
                'bottom' : offsetTop !== null && scrollTop <= offsetTop ?
                'top'    : false;

            if (this.affixed === affix) { return; }

            this.affixed = affix;
            this.unpin = affix === 'bottom' ? pos.y - scrollTop : null;
            domClass.remove(this.node, reset);
            domClass.add(this.node, 'affix' + (affix ? '-' + affix : ''));
        },
        
        destroy: function () {
            if (this.scroller && this.scroller.remove) {
                this.scroller.remove();
            }
        }
    });
});
},
'dobolo/ScrollSpy':function(){
define([
    "dojo/_base/declare",
    "./ScrollTopSpyHelper",
    "dojo/_base/window",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/query",
    "dojo/on"
], function (
    declare,
    ScrollTopSpyHelper,
    baseWin,
    domClass,
    domAttr,
    query,
    on
) {
    return declare([], {
        
        helper: null,
        handle: null,
        
        constructor: function (props, scrollingNode) {
            var props = props || {},
                scrollingNode = (!scrollingNode || scrollingNode && scrollingNode.tagName === 'BODY') ? baseWin.doc : scrollingNode,
                offsetNodes = (props.offsetsSelector) ? query(props.offsetsSelector, scrollingNode) : [],
                offsetTop = props.offsetTop || 0,
                wait = props.wait || 100,
                targetSelector = (props.targetSelector) ? props.targetSelector : null;
            
            this.helper = new ScrollTopSpyHelper(scrollingNode, offsetNodes, offsetTop, wait);
            
            this.handle = this.helper.on('active', function (ev) {
                // find list items in target
                query(targetSelector + ' li').forEach(function (listItem) {
                    // find anchors in list item
                    query('> a', listItem).forEach(function (target) {
                        var href = (domAttr.get(target, 'href') || '').replace(/^#/, '');
                        domClass[(href === ev.node.id) ? 'add' : 'remove'](listItem, 'active');
                    });
                });
            });
        },
        
        destroy: function () {
            this.helper.destroy();
            
            if (this.handle && this.handle.remove) {
                this.handle.remove();
            }
        }
    });
});
},
'dobolo/ScrollTopSpyHelper':function(){
define([
    "dojo/_base/declare",
    "dojo/Evented",
    "dojo/dom-geometry",
    "dojo/_base/lang",
    "dojo/_base/window",
    "dojo/dom",
    "dojo/on",
    "./Util"
], function (
    declare,
    Evented,
    domGeom,
    lang,
    baseWin,
    dom,
    on,
    Util
) {
    return declare([Evented], {
        scroller: null,
        
        constructor: function (scrollingNode, offsetNodes, topOffset, wait) {
            var x,
                wait = wait || 100,
                topOffset = topOffset || 0,
                activeNode = null,
                getActiveNode = Util.throttle(function (offsetNodes) {
                    var scrollingNodeTop = (scrollingNode === baseWin.doc) ? 0 : domGeom.position(scrollingNode).y;
                    for (x = offsetNodes.length - 1; x >= 0; x -= 1) {
                        if (domGeom.position(offsetNodes[x], false).y <= 0 + topOffset + scrollingNodeTop) {
                            if (activeNode === offsetNodes[x]) { return; }
                            
                            activeNode = offsetNodes[x];
                            
                            this.emit('active', {
                                bubbles: true,
                                cancelable: true,
                                node: offsetNodes[x]
                            });
                            return;
                        }
                    }
                }, wait, this);
            
            this.scroller = on(scrollingNode, 'scroll', lang.hitch(this, function (ev) {
                node = getActiveNode(offsetNodes);
            }));
        },
        
        destroy: function () {
            if (this.scroller && this.scroller.remove) {
                this.scroller.remove();
            }
        }
    });
});
},
'dobolo/Util':function(){
define([], function () {
    "use strict";
    
    return {
        // Source: https://github.com/xsokev/Dojo-Bootstrap
        transition: (function () {
            var transitionEnd = (function () {
                var el = document.createElement('bootstrap'),
                    transEndEventNames = {
                        WebkitTransition: 'webkitTransitionEnd',
                        MozTransition: 'transitionend',
                        OTransition: 'oTransitionEnd',
                        transition: 'transitionend'
                    };

                for (var name in transEndEventNames) {
                    if (el.style[name] !== undefined) {
                        return transEndEventNames[name];
                    }
                }
            })();

            return transitionEnd && {
                end: transitionEnd
            };
        })(),
        
        // Source: https://github.com/phiggins42/plugd
        throttle: function (cb, wait, thisObj) {
            // summary:
            //      Create a function that will only execute once per `wait` periods.
            // description:
            //      Create a function that will only execute once per `wait` periods
            //      from last execution when called repeatedly. Useful for preventing excessive
            //      calculations in rapidly firing events, such as window.resize, node.mousemove
            //      and so on.
            // cb: Function
            //      The callback to fire.
            // wait: Integer
            //      time to delay before allowing cb to call again.
            // thisObj: Object?
            //      Optional execution context
            var canrun = true;
            return function () {
                if (!canrun) return;
                canrun = false;
                cb.apply(thisObj || cb, arguments);
                setTimeout(function () {
                    canrun = true;
                }, wait);
            }
        }
    };
});
}}});
require([
    "dojo/parser",
    "dojo/domReady!"
], function (
    parser
) {
    window.prettyPrint && prettyPrint();
});