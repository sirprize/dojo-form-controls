define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dijit/form/_FormSelectWidget",
    "dijit/_Container",
    "dojo/dom-attr",
    "dojo/i18n",
    "dojo/on",
    "./Option",
    "dojo/i18n!dijit/form/nls/validate"
], function (
    declare,
    array,
    lang,
    _FormSelectWidget,
    _Container,
    domAttr,
    i18n,
    on,
    Option
) {
    return declare([_FormSelectWidget, _Container], {
        // summary:
        //      Provide widget functionality for an HTML <select> control
        
        templateString: '<select name="${name}" data-dojo-attach-point="containerNode,focusNode"></select>',
        
        // required: Boolean
        //      Can be true or false, default is false.
        required: false,

        // message: String
        //      Currently displayed error/prompt message
        message: '',
        
        _attrToDom: function(attr, value, commands) {
            // summary:
            //      _WidgetBase::_attrToDom() considers 'options' a standard attribute name
            //      for <select> tags and adds the option objects as an attribute to the domNode.
            //      We don't want that
            if (attr !== 'options') {
                this.inherited(arguments);
            }
        },
        
        postMixInProperties: function () {
            // summary:
            //      set the missing message
            var loc = i18n.getLocalization('dijit/form', 'validate', this.lang);
            this._missingMsg = (loc) ? loc.missingMessage : 'Input required';
            this.inherited(arguments);
        },
        
        postCreate: function () {
            this.inherited(arguments);
            
            this.own(on(this.domNode, 'change', lang.hitch(this, function (e) {
                this._handleOnChange(this._getValueFromChildren());
                this.validate();
            })));
        },
        
        startup: function () {
            // summary:
            //      Load children here only if we're not loading from a store
            if (this._started) { return; }
            
            if (!this.store) {
                this._loadChildren();
            }
            
            this._started = true;
            this.validate();
        },
        
        _getValueFromChildren: function () {
            // summary:
            //      Get the currently selected options in the <select>
            var vals = [];
            
            if (!this.get('multiple')) {
                return (this.domNode.selectedIndex === -1) ? null : this.domNode.options[this.domNode.selectedIndex].value;
            }
            
            for (x = 0; x < this.domNode.length; x += 1) {
                if (this.domNode[x].selected) {
                    vals[vals.length] = this.domNode[x].value;
                }
            }
            
            return vals;
        },
        
        _updateSelection: function () {
            // summary:
            //      Set the selected="" attribute on <option> widgets
            array.forEach(this.getChildren(), lang.hitch(this, function (widget) {
                this._select(widget)
            }));
        },

        _select: function (widget) {
            // summary:
            //      Set the selected="" attribute on an <option> widget
            // widget: Object
            var selected = false, value = this.get('value');
            
            if (lang.isArray(value)) {
                array.forEach(value, function (v) {
                    if (v === widget.get('value')) {
                        selected = true;
                    }
                });
            } else {
                if (value === widget.get('value')) {
                    selected = true;
                }
            }
            
            widget.set('selected', selected);
        },
        
        _addOptionItem: function (option) {
            // summary:
            //      Create an <option> widget and add it to this <select>
            // option: Object
            var widget = new Option({
                value: option.value,
                label: option.label,
                disabled: option.disabled || false
            });
            
            //this._select(widget);
            this.addChild(widget);
        },
        
        _setDisabledAttr: function(/*Boolean*/ value) {
            this.inherited(arguments);
            this.validate();
        },

        _setRequiredAttr: function(value) {
            // summary:
            //      Set the required="" attribute on this <select>
            // value: Boolean
            var required = (value && !this.get('disabled')) ? 'true' : 'false';
            domAttr.set(this.domNode, { 'required': required, 'aria-required': required});
            this._set('required', value);
            this.validate();
        },
        
        validate: function () {
            // summary:
            //      Called by oninit, onblur, and onkeypress, and whenever required/disabled state changes
            // description:
            //      Set missing or invalid messages if appropriate.
            if (!this._started) { return; }
            var isValid = this.isValid();
            domAttr.set(this.focusNode, 'aria-invalid', isValid ? 'false' : 'true');
            this._set('message', isValid ? '' : this._missingMsg);
            return isValid;
        },
        
        isValid: function () {
            // summary:
            //      Whether or not this is a valid value. The only way a <select>
            //      can be invalid is when it's required but nothing is selected.
            return (this.disabled || !this.required || this.value === 0 || !(/^\s*$/.test(this.value || '')));
        },
        
        _onFocus: function () {
            this.validate();
            this.inherited(arguments);
        },

        _onBlur: function () {
            this.inherited(arguments);
            this.validate();
        }
    });
});