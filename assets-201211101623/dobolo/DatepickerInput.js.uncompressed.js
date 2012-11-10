define("dobolo/DatepickerInput", [
    "dojo/_base/declare",
    "mijit/_WidgetBase",
    "mijit/_TemplatedMixin",
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
            f = (f === 'long' || f === 'short' || f === 'medium' || f === 'full') ? f : 'full';
            this._set('format', f);
        },
        
        _setWeekStartAttr: function (weekStart) {
            this._set('weekStart', weekStart);
        },
        
        _setDateAttr: function (valueOrDate) {
            this._setValueAndDate(valueOrDate);
        },
        
        _setValueAttr: function (valueOrDate) {
            this._setValueAndDate(valueOrDate);
        },
        
        _setValueAndDate: function (valueOrDate) {
            var oldVal = this.get('value'),
                self = this,
                setter = function (v, d) {
                    self.domNode.value = v;
                    self._set('value', v);
                    self._set('date', d);
                    if (oldVal !== v) {
                        self.onChange(v);
                    }
                };
            
            if (valueOrDate && !(valueOrDate instanceof Date)) {
                valueOrDate = locale.parse(valueOrDate, {
                    formatLength: this.get('format'),
                    selector: 'date'
                });
            }
            
            if (!valueOrDate) {
                return setter('', null);
            }
            
            setter(locale.format(valueOrDate, {
                formatLength: this.get('format'),
                selector: 'date'
            }), valueOrDate);
        },
        
        onChange: function (newValue) {},
        
        positionCalendar: function () {
            var pos = domGeom.position(this.domNode, true);
            this.calendar.set('posTop', (pos.y + this.domNode.offsetHeight) + 'px');
            this.calendar.set('posLeft', pos.x + 'px');
            this.calendar.position();
        },
        
        showCalendar: function () {
            this.calendar.placeAt(document.body, 'last');
            this.positionCalendar();
            this.calendar.show();
        },
        
        hideCalendar: function () {
            this.calendar.hide();
        },
        
        postCreate: function () {
            this.inherited(arguments);
            
            this.own(this.calendar = new Calendar({
                weekStart: this.weekStart,
                date: this.date
            }));
            
            this.own(this.watch('date', lang.hitch(this, function (prop, old, val) {
                this.calendar.set('date', val);
            })));
            
            this.own(this.calendar.watch('date', lang.hitch(this, function (prop, old, val) {
                this.set('date', val);
            })));
            
            this.own(on(this.calendar, 'show', lang.hitch(this, function (ev) {
                this.emit('show-calendar', {
                    bubbles: true,
                    cancelable: true
                });
            })));
            
            this.own(on(this.calendar, 'hide', lang.hitch(this, function (ev) {
                this.emit('hide-calendar', {
                    bubbles: true,
                    cancelable: true
                });
            })));
            
            this.calendar.startup();
            this.own(on(win.global, 'resize', lang.hitch(this, 'positionCalendar')));
            this.own(on(this.domNode, 'focus', lang.hitch(this, 'showCalendar')));
            this.own(on(this.domNode, 'click', lang.hitch(this, 'showCalendar')));
            this.own(on(this.domNode, 'blur', lang.hitch(this, 'hideCalendar')));
            
            this.own(on(this.domNode, 'keydown', lang.hitch(this, function (e) {
                if (e.keyCode === 9 || e.keyCode === 13) {
                    this.calendar.hide();
                }
            })));
            
            this.own(on(this.domNode, 'keyup', lang.hitch(this, function (e) {
                this.set('date', this.get('date'));
            })));
        }
    });
});