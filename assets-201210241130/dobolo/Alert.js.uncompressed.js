require({cache:{
'url:dobolo/templates/Alert.html':"<div class=\"alert\" data-dojo-attach-point=\"containerNode\">\n    <button data-dojo-attach-point=\"dismissNode\" type=\"button\" class=\"close\" data-dojo-dismiss=\"alert\">&times;</button>\n    <div data-dojo-attach-point=\"messageNode\"></div>\n</div>"}});
define("dobolo/Alert", [
    './Util',
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/query",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/text!./templates/Alert.html"
], function (
    Util,
    declare,
    _WidgetBase,
    _TemplatedMixin,
    query,
    lang,
    on,
    domAttr,
    domClass,
    domStyle,
    template
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        
        templateString: template,
        
        postCreate: function () {
            // summary:
            //      Attach event to dismiss this alert if an immediate child-node
            //      has a data-dojo-dismiss="alert" attribute
            var dismiss = null;
            this.inherited(arguments);
            
            if (domAttr.get(this.srcNodeRef, 'data-dojo-type')) {
                // declarative instantiation assumed > hide template stuff
                domStyle.set(this.dismissNode, 'display', 'none');
                domStyle.set(this.messageNode, 'display', 'none');
            }
            
            query("> *", this.domNode).forEach(lang.hitch(this, function (node) {
                dismiss = (domAttr.get(node, 'data-dojo-dismiss') || '').replace(/\s+/g, '').toLowerCase();
                
                if (dismiss === 'alert') {
                    this.own(on(node, 'click', lang.hitch(this, function (ev) {
                        ev.preventDefault();
                        this.close();
                    })));
                }
            }));
        },
        
        close: function () {
            // summary:
            //      Destroy itself after an optional fade transition
            var eventObj = {
                    bubbles: true,
                    cancelable: true
                },
                transition = Util.transition && domClass.contains(this.domNode, 'fade'),
                remove = function () {
                    this.emit('closed', eventObj);
                    this.destroyRecursive();
                };

            this.emit('close', eventObj);
            domClass.remove(this.domNode, 'in');
            
            if (transition) {
                on(this.domNode, Util.transition.end, lang.hitch(this, remove));
            } else {
                lang.hitch(this, remove)();
            }
        },
        
        _setMessageAttr: function (val) {
            this.messageNode.innerHTML = val;
        },
        
        _setClassAttr: function (val) {
            domClass.add(this.domNode, val);
        },
        
        _setDismissableAttr: function (val) {
            domStyle.set(this.dismissNode, 'display', (val) ? 'block' : 'none');
        }
    });
});