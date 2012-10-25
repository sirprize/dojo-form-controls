define("dobolo/DatepickerInput", [
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/_base/window",
    "dojo/_base/lang",
    "dojo/date/locale",
    "dojo/on",
    "dojo/dom-geometry",
    "./Calendar"
 ], function (
    declare,
    _WidgetBase,
    _TemplatedMixin,
    win,
    lang,
    locale,
    on,
    domGeom,
    Calendar
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        
        templateString: '<input type="text" data-dojo-attach-point="containerNode"/>',
        format: 'full',
        date: null,
        weekStart: 0,
        
        _setFormatAttr: function (f) {
            f = (f === 'long' || f === 'short' || f === 'medium' || f === 'full') ? f : 'long';
            this._set('format', f);
        },
        
        _setWeekStartAttr: function (weekStart) {
            this._set('weekStart', weekStart);
        },
        
        _setDateAttr: function (d) {
            this._set('date', (d instanceof Date) ? d : new Date());
            this.domNode.value = locale.format(this.get('date'), {
                selector: 'date',
                formatLength: this.get('format')
            });
        },
        
        positionCalendar: function (refNode) {
            var pos = domGeom.position(refNode, true);
            this.calendar.set('posTop', (pos.y + refNode.offsetHeight) + 'px');
            this.calendar.set('posLeft', pos.x + 'px');
            this.calendar.position();
        },
        
        showCalendar: function () {
            this.calendar.placeAt(document.body, 'last');
            this.calendar.show();
        },
        
        updateCalendar: function () {
            this.calendar.update();
        },
        
        hideCalendar: function () {
            this.calendar.hide();
        },
        
        postCreate: function () {
            this.inherited(arguments);
            
            if (this.get('date') instanceof Date) {
                this.domNode.value = locale.format(this.get('date'), {
                    selector: 'date',
                    formatLength: this.get('format')
                });
            }
            
            this.own(this.calendar = new Calendar({
                weekStart: this.weekStart,
                date: this.date
            }));
            
            this.calendar.watch('date', lang.hitch(this, function (prop, oldVal, val) {
                this.domNode.value = locale.format(val, {
                    selector: 'date',
                    formatLength: this.get('format')
                });
                this.set('date', val);
            }));
            
            this.calendar.on('show', lang.hitch(this, function (ev) {
                this.emit('show-calendar', {
                    bubbles: true,
                    cancelable: true
                });
            }));
            
            this.calendar.on('hide', lang.hitch(this, function (ev) {
                this.emit('hide-calendar', {
                    bubbles: true,
                    cancelable: true
                });
            }));
            
            this.calendar.startup();
            lang.hitch(this, 'positionCalendar', this.domNode)();
            
            this.own(on(win.global, 'resize', lang.hitch(this, 'positionCalendar', this.domNode)));
            this.own(on(this.domNode, 'focus', lang.hitch(this, 'showCalendar')));
            this.own(on(this.domNode, 'click', lang.hitch(this, 'showCalendar')));
            this.own(on(this.domNode, 'blur', lang.hitch(this, 'hideCalendar')));
            this.own(on(this.domNode, 'keyup', lang.hitch(this, 'updateCalendar')));
            this.own(on(this.domNode, 'keydown', lang.hitch(this, function (e) {
                if (e.keyCode === 9 || e.keyCode === 13) {
                    this.calendar.hide();
                }
            })));
        }
    });
});