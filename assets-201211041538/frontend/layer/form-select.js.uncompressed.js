require({cache:{
'dijitive/Select':function(){
define("dijitive/Select", [
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
},
'dijit/form/_FormSelectWidget':function(){
define("dijit/form/_FormSelectWidget", [
	"dojo/_base/array", // array.filter array.forEach array.map array.some
	"dojo/_base/Deferred",
	"dojo/aspect", // aspect.after
	"dojo/data/util/sorter", // util.sorter.createSortFunction
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.setSelectable
	"dojo/dom-class", // domClass.toggle
	"dojo/_base/kernel",	// _scopeName
	"dojo/_base/lang", // lang.delegate lang.isArray lang.isObject lang.hitch
	"dojo/query", // query
	"dojo/when",
	"dojo/store/util/QueryResults",
	"./_FormValueWidget"
], function(array, Deferred, aspect, sorter, declare, dom, domClass, kernel, lang, query, when,
			QueryResults, _FormValueWidget){

// module:
//		dijit/form/_FormSelectWidget

/*=====
var __SelectOption = {
	// value: String
	//		The value of the option.  Setting to empty (or missing) will
	//		place a separator at that location
	// label: String
	//		The label for our option.  It can contain html tags.
	// selected: Boolean
	//		Whether or not we are a selected option
	// disabled: Boolean
	//		Whether or not this specific option is disabled
};
=====*/

var _FormSelectWidget = declare("dijit.form._FormSelectWidget", _FormValueWidget, {
	// summary:
	//		Extends _FormValueWidget in order to provide "select-specific"
	//		values - i.e., those values that are unique to `<select>` elements.
	//		This also provides the mechanism for reading the elements from
	//		a store, if desired.

	// multiple: [const] Boolean
	//		Whether or not we are multi-valued
	multiple: false,

	// options: __SelectOption[]
	//		The set of options for our select item.  Roughly corresponds to
	//		the html `<option>` tag.
	options: null,

	// store: dojo/store/api/Store
	//		A store to use for getting our list of options - rather than reading them
	//		from the `<option>` html tags.   Should support getIdentity().
	//		For back-compat store can also be a dojo/data/api/Identity.
	store: null,

	// query: object
	//		A query to use when fetching items from our store
	query: null,

	// queryOptions: object
	//		Query options to use when fetching from the store
	queryOptions: null,

	// labelAttr: String?
	//		The entries in the drop down list come from this attribute in the dojo.store items.
	//		If ``store`` is set, labelAttr must be set too, unless store is an old-style
	//		dojo.data store rather than a new dojo/store.
	labelAttr: "",

	// onFetch: Function
	//		A callback to do with an onFetch - but before any items are actually
	//		iterated over (i.e. to filter even further what you want to add)
	onFetch: null,

	// sortByLabel: Boolean
	//		Flag to sort the options returned from a store by the label of
	//		the store.
	sortByLabel: true,


	// loadChildrenOnOpen: Boolean
	//		By default loadChildren is called when the items are fetched from the
	//		store.  This property allows delaying loadChildren (and the creation
	//		of the options/menuitems) until the user clicks the button to open the
	//		dropdown.
	loadChildrenOnOpen: false,

	// onLoadDeferred: [readonly] dojo.Deferred
	//		This is the `dojo.Deferred` returned by setStore().
	//		Calling onLoadDeferred.then() registers your
	//		callback to be called only once, when the prior setStore completes.
	onLoadDeferred: null,

	getOptions: function(/*anything*/ valueOrIdx){
		// summary:
		//		Returns a given option (or options).
		// valueOrIdx:
		//		If passed in as a string, that string is used to look up the option
		//		in the array of options - based on the value property.
		//		(See dijit/form/_FormSelectWidget.__SelectOption).
		//
		//		If passed in a number, then the option with the given index (0-based)
		//		within this select will be returned.
		//
		//		If passed in a dijit/form/_FormSelectWidget.__SelectOption, the same option will be
		//		returned if and only if it exists within this select.
		//
		//		If passed an array, then an array will be returned with each element
		//		in the array being looked up.
		//
		//		If not passed a value, then all options will be returned
		//
		// returns:
		//		The option corresponding with the given value or index.  null
		//		is returned if any of the following are true:
		//
		//		- A string value is passed in which doesn't exist
		//		- An index is passed in which is outside the bounds of the array of options
		//		- A dijit/form/_FormSelectWidget.__SelectOption is passed in which is not a part of the select

		// NOTE: the compare for passing in a dijit/form/_FormSelectWidget.__SelectOption checks
		//		if the value property matches - NOT if the exact option exists
		// NOTE: if passing in an array, null elements will be placed in the returned
		//		array when a value is not found.
		var lookupValue = valueOrIdx, opts = this.options || [], l = opts.length;

		if(lookupValue === undefined){
			return opts; // __SelectOption[]
		}
		if(lang.isArray(lookupValue)){
			return array.map(lookupValue, "return this.getOptions(item);", this); // __SelectOption[]
		}
		if(lang.isObject(valueOrIdx)){
			// We were passed an option - so see if it's in our array (directly),
			// and if it's not, try and find it by value.
			if(!array.some(this.options, function(o, idx){
				if(o === lookupValue ||
					(o.value && o.value === lookupValue.value)){
					lookupValue = idx;
					return true;
				}
				return false;
			})){
				lookupValue = -1;
			}
		}
		if(typeof lookupValue == "string"){
			for(var i=0; i<l; i++){
				if(opts[i].value === lookupValue){
					lookupValue = i;
					break;
				}
			}
		}
		if(typeof lookupValue == "number" && lookupValue >= 0 && lookupValue < l){
			return this.options[lookupValue]; // __SelectOption
		}
		return null; // null
	},

	addOption: function(/*__SelectOption|__SelectOption[]*/ option){
		// summary:
		//		Adds an option or options to the end of the select.  If value
		//		of the option is empty or missing, a separator is created instead.
		//		Passing in an array of options will yield slightly better performance
		//		since the children are only loaded once.
		if(!lang.isArray(option)){ option = [option]; }
		array.forEach(option, function(i){
			if(i && lang.isObject(i)){
				this.options.push(i);
			}
		}, this);
		this._loadChildren();
	},

	removeOption: function(/*String|__SelectOption|Number|Array*/ valueOrIdx){
		// summary:
		//		Removes the given option or options.  You can remove by string
		//		(in which case the value is removed), number (in which case the
		//		index in the options array is removed), or select option (in
		//		which case, the select option with a matching value is removed).
		//		You can also pass in an array of those values for a slightly
		//		better performance since the children are only loaded once.
		if(!lang.isArray(valueOrIdx)){ valueOrIdx = [valueOrIdx]; }
		var oldOpts = this.getOptions(valueOrIdx);
		array.forEach(oldOpts, function(i){
			// We can get null back in our array - if our option was not found.  In
			// that case, we don't want to blow up...
			if(i){
				this.options = array.filter(this.options, function(node){
					return (node.value !== i.value || node.label !== i.label);
				});
				this._removeOptionItem(i);
			}
		}, this);
		this._loadChildren();
	},

	updateOption: function(/*__SelectOption|__SelectOption[]*/ newOption){
		// summary:
		//		Updates the values of the given option.  The option to update
		//		is matched based on the value of the entered option.  Passing
		//		in an array of new options will yield better performance since
		//		the children will only be loaded once.
		if(!lang.isArray(newOption)){ newOption = [newOption]; }
		array.forEach(newOption, function(i){
			var oldOpt = this.getOptions(i), k;
			if(oldOpt){
				for(k in i){ oldOpt[k] = i[k]; }
			}
		}, this);
		this._loadChildren();
	},

	setStore: function(store,
						selectedValue,
						fetchArgs){
		// summary:
		//		Sets the store you would like to use with this select widget.
		//		The selected value is the value of the new store to set.  This
		//		function returns the original store, in case you want to reuse
		//		it or something.
		// store: dojo/store/api/Store
		//		The dojo.store you would like to use - it MUST implement getIdentity()
		//		and MAY implement observe().
		//		For backwards-compatibility this can also be a data.data store, in which case
		//		it MUST implement dojo/data/api/Identity,
		//		and MAY implement dojo/data/api/Notification.
		// selectedValue: anything?
		//		The value that this widget should set itself to *after* the store
		//		has been loaded
		// fetchArgs: Object?
		//		Hash of parameters to set filter on store, etc.
		//
		//		- query: new value for Select.query,
		//		- queryOptions: new value for Select.queryOptions,
		//		- onFetch: callback function for each item in data (Deprecated)
		var oStore = this.store;
		fetchArgs = fetchArgs || {};

		if(oStore !== store){
			// Our store has changed, so cancel any listeners on old store (remove for 2.0)
			var h;
			while((h = this._notifyConnections.pop())){ h.remove(); }

			// For backwards-compatibility, accept dojo.data store in addition to dojo.store.store.  Remove in 2.0.
			if(!store.get){
				lang.mixin(store, {
					_oldAPI: true,
					get: function(id){
						// summary:
						//		Retrieves an object by it's identity. This will trigger a fetchItemByIdentity.
						//		Like dojo.store.DataStore.get() except returns native item.
						var deferred = new Deferred();
						this.fetchItemByIdentity({
							identity: id,
							onItem: function(object){
								deferred.resolve(object);
							},
							onError: function(error){
								deferred.reject(error);
							}
						});
						return deferred.promise;
					},
					query: function(query, options){
						// summary:
						//		Queries the store for objects.   Like dojo/store/DataStore.query()
						//		except returned Deferred contains array of native items.
						var deferred = new Deferred(function(){ if(fetchHandle.abort){ fetchHandle.abort(); } } );
						deferred.total = new Deferred();
						var fetchHandle = this.fetch(lang.mixin({
							query: query,
							onBegin: function(count){
								deferred.total.resolve(count);
							},
							onComplete: function(results){
								deferred.resolve(results);
							},
							onError: function(error){
								deferred.reject(error);
							}
						}, options));
						return new QueryResults(deferred);
					}
				});

				if(store.getFeatures()["dojo.data.api.Notification"]){
					this._notifyConnections = [
						aspect.after(store, "onNew", lang.hitch(this, "_onNewItem"), true),
						aspect.after(store, "onDelete", lang.hitch(this, "_onDeleteItem"), true),
						aspect.after(store, "onSet", lang.hitch(this, "_onSetItem"), true)
					];
				}
			}
			this._set("store", store);			// Our store has changed, so update our notifications
		}

		// Remove existing options (if there are any)
		if(this.options && this.options.length){
			this.removeOption(this.options);
		}

		// Cancel listener for updates to old store
		if(this._queryRes && this._queryRes.close){
			this._queryRes.close();
		}

		// If user has specified new query and query options along with this new store, then use them.
		if(fetchArgs.query){
			this._set("query", fetchArgs.query);
			this._set("queryOptions", fetchArgs.queryOptions);
		}

		// Add our new options
		if(store){
			this._loadingStore = true;
			this.onLoadDeferred = new Deferred();

			// Run query
			// Save result in this._queryRes so we can cancel the listeners we register below
			this._queryRes = store.query(this.query, this.queryOptions);
			when(this._queryRes, lang.hitch(this, function(items){

				if(this.sortByLabel && !fetchArgs.sort && items.length){
					if(items[0].getValue){
						// Old dojo.data API to access items, remove for 2.0
						items.sort(sorter.createSortFunction([{
							attribute: store.getLabelAttributes(items[0])[0]
						}], store));
					}else{
						var labelAttr = this.labelAttr;
						items.sort(function(a, b){
							return a[labelAttr] > b[labelAttr] ? 1 :  b[labelAttr] > a[labelAttr] ? -1 : 0;
						});
					}
				}

				if(fetchArgs.onFetch){
						items = fetchArgs.onFetch.call(this, items, fetchArgs);
				}

				// TODO: Add these guys as a batch, instead of separately
				array.forEach(items, function(i){
					this._addOptionForItem(i);
				}, this);

				// Register listener for store updates
				if(this._queryRes.observe){
					this._queryRes.observe(lang.hitch(this, function(object, deletedFrom, insertedInto){
						if(deletedFrom == insertedInto){
							this._onSetItem(object);
						}else{
							if(deletedFrom != -1){
								this._onDeleteItem(object);
							}
							if(insertedInto != -1){
								this._onNewItem(object);
							}
						}
					}), true);
				}

				// Set our value (which might be undefined), and then tweak
				// it to send a change event with the real value
				this._loadingStore = false;
				this.set("value", "_pendingValue" in this ? this._pendingValue : selectedValue);
				delete this._pendingValue;

				if(!this.loadChildrenOnOpen){
					this._loadChildren();
				}else{
					this._pseudoLoadChildren(items);
				}
				this.onLoadDeferred.resolve(true);
				this.onSetStore();
			}), function(err){
					console.error('dijit.form.Select: ' + err.toString());
					this.onLoadDeferred.reject(err);
			});
		}
		return oStore;	// dojo/data/api/Identity
	},

	// TODO: implement set() and watch() for store and query, although not sure how to handle
	// setting them individually rather than together (as in setStore() above)

	_setValueAttr: function(/*anything*/ newValue, /*Boolean?*/ priorityChange){
		// summary:
		//		set the value of the widget.
		//		If a string is passed, then we set our value from looking it up.
		if(!this._onChangeActive){ priorityChange = null; }
		if(this._loadingStore){
			// Our store is loading - so save our value, and we'll set it when
			// we're done
			this._pendingValue = newValue;
			return;
		}
		var opts = this.getOptions() || [];
		if(!lang.isArray(newValue)){
			newValue = [newValue];
		}
		array.forEach(newValue, function(i, idx){
			if(!lang.isObject(i)){
				i = i + "";
			}
			if(typeof i === "string"){
				newValue[idx] = array.filter(opts, function(node){
					return node.value === i;
				})[0] || {value: "", label: ""};
			}
		}, this);

		// Make sure some sane default is set
		newValue = array.filter(newValue, function(i){ return i && i.value; });
		if(!this.multiple && (!newValue[0] || !newValue[0].value) && opts.length){
			newValue[0] = opts[0];
		}
		array.forEach(opts, function(i){
			i.selected = array.some(newValue, function(v){ return v.value === i.value; });
		});
		var	val = array.map(newValue, function(i){ return i.value; }),
			disp = array.map(newValue, function(i){ return i.label; });

		if(typeof val == "undefined" || typeof val[0] == "undefined"){ return; } // not fully initialized yet or a failed value lookup
		this._setDisplay(this.multiple ? disp : disp[0]);
		this.inherited(arguments, [ this.multiple ? val : val[0], priorityChange ]);
		this._updateSelection();
	},

	_getDisplayedValueAttr: function(){
		// summary:
		//		returns the displayed value of the widget
		var val = this.get("value");
		if(!lang.isArray(val)){
			val = [val];
		}
		var ret = array.map(this.getOptions(val), function(v){
			if(v && "label" in v){
				return v.label;
			}else if(v){
				return v.value;
			}
			return null;
		}, this);
		return this.multiple ? ret : ret[0];
	},

	_loadChildren: function(){
		// summary:
		//		Loads the children represented by this widget's options.
		//		reset the menu to make it populatable on the next click
		if(this._loadingStore){ return; }
		array.forEach(this._getChildren(), function(child){
			child.destroyRecursive();
		});
		// Add each menu item
		array.forEach(this.options, this._addOptionItem, this);

		// Update states
		this._updateSelection();
	},

	_updateSelection: function(){
		// summary:
		//		Sets the "selected" class on the item for styling purposes
		this._set("value", this._getValueFromOpts());
		var val = this.value;
		if(!lang.isArray(val)){
			val = [val];
		}
		if(val && val[0]){
			array.forEach(this._getChildren(), function(child){
				var isSelected = array.some(val, function(v){
					return child.option && (v === child.option.value);
				});
				domClass.toggle(child.domNode, this.baseClass.replace(/\s+|$/g, "SelectedOption "), isSelected);
				child.domNode.setAttribute("aria-selected", isSelected ? "true" : "false");
			}, this);
		}
	},

	_getValueFromOpts: function(){
		// summary:
		//		Returns the value of the widget by reading the options for
		//		the selected flag
		var opts = this.getOptions() || [];
		if(!this.multiple && opts.length){
			// Mirror what a select does - choose the first one
			var opt = array.filter(opts, function(i){
				return i.selected;
			})[0];
			if(opt && opt.value){
				return opt.value;
			}else{
				opts[0].selected = true;
				return opts[0].value;
			}
		}else if(this.multiple){
			// Set value to be the sum of all selected
			return array.map(array.filter(opts, function(i){
				return i.selected;
			}), function(i){
				return i.value;
			}) || [];
		}
		return "";
	},

	// Internal functions to call when we have store notifications come in
	_onNewItem: function(/*item*/ item, /*Object?*/ parentInfo){
		if(!parentInfo || !parentInfo.parent){
			// Only add it if we are top-level
			this._addOptionForItem(item);
		}
	},
	_onDeleteItem: function(/*item*/ item){
		var store = this.store;
		this.removeOption(store.getIdentity(item));
	},
	_onSetItem: function(/*item*/ item){
		this.updateOption(this._getOptionObjForItem(item));
	},

	_getOptionObjForItem: function(item){
		// summary:
		//		Returns an option object based off the given item.  The "value"
		//		of the option item will be the identity of the item, the "label"
		//		of the option will be the label of the item.

		// remove getLabel() call for 2.0 (it's to support the old dojo.data API)
		var store = this.store,
			label = (this.labelAttr && this.labelAttr in item) ? item[this.labelAttr] : store.getLabel(item),
			value = (label ? store.getIdentity(item) : null);
		return {value: value, label: label, item: item}; // __SelectOption
	},

	_addOptionForItem: function(/*item*/ item){
		// summary:
		//		Creates (and adds) the option for the given item
		var store = this.store;
		if(store.isItemLoaded && !store.isItemLoaded(item)){
			// We are not loaded - so let's load it and add later.
			// Remove for 2.0 (it's the old dojo.data API)
			store.loadItem({item: item, onItem: function(i){
				this._addOptionForItem(i);
			},
			scope: this});
			return;
		}
		var newOpt = this._getOptionObjForItem(item);
		this.addOption(newOpt);
	},

	constructor: function(params /*===== , srcNodeRef =====*/){
		// summary:
		//		Create the widget.
		// params: Object|null
		//		Hash of initialization parameters for widget, including scalar values (like title, duration etc.)
		//		and functions, typically callbacks like onClick.
		//		The hash can contain any of the widget's properties, excluding read-only properties.
		// srcNodeRef: DOMNode|String?
		//		If a srcNodeRef (DOM node) is specified, replace srcNodeRef with my generated DOM tree

		//		Saves off our value, if we have an initial one set so we
		//		can use it if we have a store as well (see startup())
		this._oValue = (params || {}).value || null;
		this._notifyConnections = [];	// remove for 2.0
	},

	buildRendering: function(){
		this.inherited(arguments);
		dom.setSelectable(this.focusNode, false);
	},

	_fillContent: function(){
		// summary:
		//		Loads our options and sets up our dropdown correctly.  We
		//		don't want any content, so we don't call any inherit chain
		//		function.
		if(!this.options){
			this.options =
				this.srcNodeRef
				? query("> *", this.srcNodeRef).map(
					function(node){
						if(node.getAttribute("type") === "separator"){
							return { value: "", label: "", selected: false, disabled: false };
						}
						return {
							value: (node.getAttribute("data-" + kernel._scopeName + "-value") || node.getAttribute("value")),
							label: String(node.innerHTML),
							// FIXME: disabled and selected are not valid on complex markup children (which is why we're
							// looking for data-dojo-value above.  perhaps we should data-dojo-props="" this whole thing?)
							// decide before 1.6
							selected: node.getAttribute("selected") || false,
							disabled: node.getAttribute("disabled") || false
						};
					},
					this)
				: [];
		}
		if(!this.value){
			this._set("value", this._getValueFromOpts());
		}else if(this.multiple && typeof this.value == "string"){
			this._set("value", this.value.split(","));
		}
	},

	postCreate: function(){
		// summary:
		//		sets up our event handling that we need for functioning
		//		as a select
		this.inherited(arguments);

		// Make our event connections for updating state
		this.connect(this, "onChange", "_updateSelection");

		// moved from startup
		//		Connects in our store, if we have one defined
		var store = this.store;
		if(store && (store.getIdentity || store.getFeatures()["dojo.data.api.Identity"])){
			// Temporarily set our store to null so that it will get set
			// and connected appropriately
			this.store = null;
			this.setStore(store, this._oValue);
		}
	},

	startup: function(){
		// summary:
		this._loadChildren();
		this.inherited(arguments);
	},

	destroy: function(){
		// summary:
		//		Clean up our connections

		var h;
		while((h = this._notifyConnections.pop())){ h.remove(); }

		// Cancel listener for store updates
		if(this._queryRes && this._queryRes.close){
			this._queryRes.close();
		}

		this.inherited(arguments);
	},

	_addOptionItem: function(/*__SelectOption*/ /*===== option =====*/){
		// summary:
		//		User-overridable function which, for the given option, adds an
		//		item to the select.  If the option doesn't have a value, then a
		//		separator is added in that place.  Make sure to store the option
		//		in the created option widget.
	},

	_removeOptionItem: function(/*__SelectOption*/ /*===== option =====*/){
		// summary:
		//		User-overridable function which, for the given option, removes
		//		its item from the select.
	},

	_setDisplay: function(/*String or String[]*/ /*===== newDisplay =====*/){
		// summary:
		//		Overridable function which will set the display for the
		//		widget.  newDisplay is either a string (in the case of
		//		single selects) or array of strings (in the case of multi-selects)
	},

	_getChildren: function(){
		// summary:
		//		Overridable function to return the children that this widget contains.
		return [];
	},

	_getSelectedOptionsAttr: function(){
		// summary:
		//		hooks into this.attr to provide a mechanism for getting the
		//		option items for the current value of the widget.
		return this.getOptions(this.get("value"));
	},

	_pseudoLoadChildren: function(/*item[]*/ /*===== items =====*/){
		// summary:
		//		a function that will "fake" loading children, if needed, and
		//		if we have set to not load children until the widget opens.
		// items:
		//		An array of items that will be loaded, when needed
	},

	onSetStore: function(){
		// summary:
		//		a function that can be connected to in order to receive a
		//		notification that the store has finished loading and all options
		//		from that store are available
	}
});

/*=====
_FormSelectWidget.__SelectOption = __SelectOption;
=====*/

return _FormSelectWidget;

});

},
'dojo/data/util/sorter':function(){
define("dojo/data/util/sorter", ["../../_base/lang"], function(lang){
	// module:
	//		dojo/data/util/sorter
	// summary:
	//		TODOC

var sorter = {};
lang.setObject("dojo.data.util.sorter", sorter);

sorter.basicComparator = function(	/*anything*/ a,
													/*anything*/ b){
	// summary:
	//		Basic comparison function that compares if an item is greater or less than another item
	// description:
	//		returns 1 if a > b, -1 if a < b, 0 if equal.
	//		'null' values (null, undefined) are treated as larger values so that they're pushed to the end of the list.
	//		And compared to each other, null is equivalent to undefined.

	//null is a problematic compare, so if null, we set to undefined.
	//Makes the check logic simple, compact, and consistent
	//And (null == undefined) === true, so the check later against null
	//works for undefined and is less bytes.
	var r = -1;
	if(a === null){
		a = undefined;
	}
	if(b === null){
		b = undefined;
	}
	if(a == b){
		r = 0;
	}else if(a > b || a == null){
		r = 1;
	}
	return r; //int {-1,0,1}
};

sorter.createSortFunction = function(	/* attributes[] */sortSpec, /*dojo/data/api/Read*/ store){
	// summary:
	//		Helper function to generate the sorting function based off the list of sort attributes.
	// description:
	//		The sort function creation will look for a property on the store called 'comparatorMap'.  If it exists
	//		it will look in the mapping for comparisons function for the attributes.  If one is found, it will
	//		use it instead of the basic comparator, which is typically used for strings, ints, booleans, and dates.
	//		Returns the sorting function for this particular list of attributes and sorting directions.
	// sortSpec:
	//		A JS object that array that defines out what attribute names to sort on and whether it should be descenting or asending.
	//		The objects should be formatted as follows:
	// |	{
	// |		attribute: "attributeName-string" || attribute,
	// |		descending: true|false;   // Default is false.
	// |	}
	// store:
	//		The datastore object to look up item values from.

	var sortFunctions=[];

	function createSortFunction(attr, dir, comp, s){
		//Passing in comp and s (comparator and store), makes this
		//function much faster.
		return function(itemA, itemB){
			var a = s.getValue(itemA, attr);
			var b = s.getValue(itemB, attr);
			return dir * comp(a,b); //int
		};
	}
	var sortAttribute;
	var map = store.comparatorMap;
	var bc = sorter.basicComparator;
	for(var i = 0; i < sortSpec.length; i++){
		sortAttribute = sortSpec[i];
		var attr = sortAttribute.attribute;
		if(attr){
			var dir = (sortAttribute.descending) ? -1 : 1;
			var comp = bc;
			if(map){
				if(typeof attr !== "string" && ("toString" in attr)){
					 attr = attr.toString();
				}
				comp = map[attr] || bc;
			}
			sortFunctions.push(createSortFunction(attr,
				dir, comp, store));
		}
	}
	return function(rowA, rowB){
		var i=0;
		while(i < sortFunctions.length){
			var ret = sortFunctions[i++](rowA, rowB);
			if(ret !== 0){
				return ret;//int
			}
		}
		return 0; //int
	}; // Function
};

return sorter;
});

},
'dojo/store/util/QueryResults':function(){
define("dojo/store/util/QueryResults", ["../../_base/array", "../../_base/lang", "../../_base/Deferred"
], function(array, lang, Deferred){

// module:
//		dojo/store/util/QueryResults

var QueryResults = function(results){
	// summary:
	//		A function that wraps the results of a store query with additional
	//		methods.
	// description:
	//		QueryResults is a basic wrapper that allows for array-like iteration
	//		over any kind of returned data from a query.  While the simplest store
	//		will return a plain array of data, other stores may return deferreds or
	//		promises; this wrapper makes sure that *all* results can be treated
	//		the same.
	//
	//		Additional methods include `forEach`, `filter` and `map`.
	// results: Array|dojo/promise/Promise
	//		The result set as an array, or a promise for an array.
	// returns:
	//		An array-like object that can be used for iterating over.
	// example:
	//		Query a store and iterate over the results.
	//
	//	|	store.query({ prime: true }).forEach(function(item){
	//	|		//	do something
	//	|	});

	if(!results){
		return results;
	}
	// if it is a promise it may be frozen
	if(results.then){
		results = lang.delegate(results);
	}
	function addIterativeMethod(method){
		if(!results[method]){
			results[method] = function(){
				var args = arguments;
				return Deferred.when(results, function(results){
					Array.prototype.unshift.call(args, results);
					return QueryResults(array[method].apply(array, args));
				});
			};
		}
	}
	addIterativeMethod("forEach");
	addIterativeMethod("filter");
	addIterativeMethod("map");
	if(!results.total){
		results.total = Deferred.when(results, function(results){
			return results.length;
		});
	}
	return results; // Object
};

lang.setObject("dojo.store.util.QueryResults", QueryResults);

return QueryResults;

});

},
'dijit/form/_FormValueWidget':function(){
define("dijit/form/_FormValueWidget", [
	"dojo/_base/declare", // declare
	"dojo/sniff", // has("ie")
	"./_FormWidget",
	"./_FormValueMixin"
], function(declare, has, _FormWidget, _FormValueMixin){

// module:
//		dijit/form/_FormValueWidget

return declare("dijit.form._FormValueWidget", [_FormWidget, _FormValueMixin],
{
	// summary:
	//		Base class for widgets corresponding to native HTML elements such as `<input>` or `<select>`
	//		that have user changeable values.
	// description:
	//		Each _FormValueWidget represents a single input value, and has a (possibly hidden) `<input>` element,
	//		to which it serializes it's input value, so that form submission (either normal submission or via FormBind?)
	//		works as expected.

	// Don't attempt to mixin the 'type', 'name' attributes here programatically -- they must be declared
	// directly in the template as read by the parser in order to function. IE is known to specifically
	// require the 'name' attribute at element creation time.  See #8484, #8660.

	_layoutHackIE7: function(){
		// summary:
		//		Work around table sizing bugs on IE7 by forcing redraw

		if(has("ie") == 7){ // fix IE7 layout bug when the widget is scrolled out of sight
			var domNode = this.domNode;
			var parent = domNode.parentNode;
			var pingNode = domNode.firstChild || domNode; // target node most unlikely to have a custom filter
			var origFilter = pingNode.style.filter; // save custom filter, most likely nothing
			var _this = this;
			while(parent && parent.clientHeight == 0){ // search for parents that haven't rendered yet
				(function ping(){
					var disconnectHandle = _this.connect(parent, "onscroll",
						function(){
							_this.disconnect(disconnectHandle); // only call once
							pingNode.style.filter = (new Date()).getMilliseconds(); // set to anything that's unique
							_this.defer(function(){ pingNode.style.filter = origFilter; }); // restore custom filter, if any
						}
					);
				})();
				parent = parent.parentNode;
			}
		}
	}
});

});

},
'dijit/form/_FormValueMixin':function(){
define("dijit/form/_FormValueMixin", [
	"dojo/_base/declare", // declare
	"dojo/dom-attr", // domAttr.set
	"dojo/keys", // keys.ESCAPE
	"dojo/sniff", // has("ie"), has("quirks")
	"./_FormWidgetMixin"
], function(declare, domAttr, keys, has, _FormWidgetMixin){

	// module:
	//		dijit/form/_FormValueMixin

	return declare("dijit.form._FormValueMixin", _FormWidgetMixin, {
		// summary:
		//		Mixin for widgets corresponding to native HTML elements such as `<input>` or `<select>`
		//		that have user changeable values.
		// description:
		//		Each _FormValueMixin represents a single input value, and has a (possibly hidden) `<input>` element,
		//		to which it serializes it's input value, so that form submission (either normal submission or via FormBind?)
		//		works as expected.

		// readOnly: Boolean
		//		Should this widget respond to user input?
		//		In markup, this is specified as "readOnly".
		//		Similar to disabled except readOnly form values are submitted.
		readOnly: false,

		_setReadOnlyAttr: function(/*Boolean*/ value){
			domAttr.set(this.focusNode, 'readOnly', value);
			this.focusNode.setAttribute("aria-readonly", value);
			this._set("readOnly", value);
		},

		postCreate: function(){
			this.inherited(arguments);

			if(has("ie")){ // IE won't stop the event with keypress
				this.connect(this.focusNode || this.domNode, "onkeydown", this._onKeyDown);
			}
			// Update our reset value if it hasn't yet been set (because this.set()
			// is only called when there *is* a value)
			if(this._resetValue === undefined){
				this._lastValueReported = this._resetValue = this.value;
			}
		},

		_setValueAttr: function(/*anything*/ newValue, /*Boolean?*/ priorityChange){
			// summary:
			//		Hook so set('value', value) works.
			// description:
			//		Sets the value of the widget.
			//		If the value has changed, then fire onChange event, unless priorityChange
			//		is specified as null (or false?)
			this._handleOnChange(newValue, priorityChange);
		},

		_handleOnChange: function(/*anything*/ newValue, /*Boolean?*/ priorityChange){
			// summary:
			//		Called when the value of the widget has changed.  Saves the new value in this.value,
			//		and calls onChange() if appropriate.   See _FormWidget._handleOnChange() for details.
			this._set("value", newValue);
			this.inherited(arguments);
		},

		undo: function(){
			// summary:
			//		Restore the value to the last value passed to onChange
			this._setValueAttr(this._lastValueReported, false);
		},

		reset: function(){
			// summary:
			//		Reset the widget's value to what it was at initialization time
			this._hasBeenBlurred = false;
			this._setValueAttr(this._resetValue, true);
		},

		_onKeyDown: function(e){
			if(e.keyCode == keys.ESCAPE && !(e.ctrlKey || e.altKey || e.metaKey)){
				if(has("ie") < 9 || (has("ie") && has("quirks"))){
					e.preventDefault(); // default behavior needs to be stopped here since keypress is too late
					var node = e.srcElement,
						te = node.ownerDocument.createEventObject();
					te.keyCode = keys.ESCAPE;
					te.shiftKey = e.shiftKey;
					node.fireEvent('onkeypress', te);
				}
			}
		}
	});
});

},
'dijit/_Container':function(){
define("dijit/_Container", [
	"dojo/_base/array", // array.forEach array.indexOf
	"dojo/_base/declare", // declare
	"dojo/dom-construct" // domConstruct.place
], function(array, declare, domConstruct){

	// module:
	//		dijit/_Container

	return declare("dijit._Container", null, {
		// summary:
		//		Mixin for widgets that contain HTML and/or a set of widget children.

		buildRendering: function(){
			this.inherited(arguments);
			if(!this.containerNode){
				// all widgets with descendants must set containerNode
				this.containerNode = this.domNode;
			}
		},

		addChild: function(/*dijit/_WidgetBase*/ widget, /*int?*/ insertIndex){
			// summary:
			//		Makes the given widget a child of this widget.
			// description:
			//		Inserts specified child widget's dom node as a child of this widget's
			//		container node, and possibly does other processing (such as layout).
			//
			//		Functionality is undefined if this widget contains anything besides
			//		a list of child widgets (ie, if it contains arbitrary non-widget HTML).

			var refNode = this.containerNode;
			if(insertIndex && typeof insertIndex == "number"){
				var children = this.getChildren();
				if(children && children.length >= insertIndex){
					refNode = children[insertIndex-1].domNode;
					insertIndex = "after";
				}
			}
			domConstruct.place(widget.domNode, refNode, insertIndex);

			// If I've been started but the child widget hasn't been started,
			// start it now.  Make sure to do this after widget has been
			// inserted into the DOM tree, so it can see that it's being controlled by me,
			// so it doesn't try to size itself.
			if(this._started && !widget._started){
				widget.startup();
			}
		},

		removeChild: function(/*Widget|int*/ widget){
			// summary:
			//		Removes the passed widget instance from this widget but does
			//		not destroy it.  You can also pass in an integer indicating
			//		the index within the container to remove (ie, removeChild(5) removes the sixth widget).

			if(typeof widget == "number"){
				widget = this.getChildren()[widget];
			}

			if(widget){
				var node = widget.domNode;
				if(node && node.parentNode){
					node.parentNode.removeChild(node); // detach but don't destroy
				}
			}
		},

		hasChildren: function(){
			// summary:
			//		Returns true if widget has child widgets, i.e. if this.containerNode contains widgets.
			return this.getChildren().length > 0;	// Boolean
		},

		_getSiblingOfChild: function(/*dijit/_WidgetBase*/ child, /*int*/ dir){
			// summary:
			//		Get the next or previous widget sibling of child
			// dir:
			//		if 1, get the next sibling
			//		if -1, get the previous sibling
			// tags:
			//		private
			var children = this.getChildren(),
				idx = array.indexOf(this.getChildren(), child);	// int
			return children[idx + dir];
		},

		getIndexOfChild: function(/*dijit/_WidgetBase*/ child){
			// summary:
			//		Gets the index of the child in this container or -1 if not found
			return array.indexOf(this.getChildren(), child);	// int
		}
	});
});

},
'dojo/i18n':function(){
define("dojo/i18n", ["./_base/kernel", "require", "./has", "./_base/array", "./_base/config", "./_base/lang", "./_base/xhr", "./json", "module"],
	function(dojo, require, has, array, config, lang, xhr, json, module){

	// module:
	//		dojo/i18n

	has.add("dojo-preload-i18n-Api",
		// if true, define the preload localizations machinery
		1
	);

	 1 || has.add("dojo-v1x-i18n-Api",
		// if true, define the v1.x i18n functions
		1
	);

	var
		thisModule = dojo.i18n =
			{
				// summary:
				//		This module implements the dojo/i18n! plugin and the v1.6- i18n API
				// description:
				//		We choose to include our own plugin to leverage functionality already contained in dojo
				//		and thereby reduce the size of the plugin compared to various loader implementations. Also, this
				//		allows foreign AMD loaders to be used without their plugins.
			},

		nlsRe =
			// regexp for reconstructing the master bundle name from parts of the regexp match
			// nlsRe.exec("foo/bar/baz/nls/en-ca/foo") gives:
			// ["foo/bar/baz/nls/en-ca/foo", "foo/bar/baz/nls/", "/", "/", "en-ca", "foo"]
			// nlsRe.exec("foo/bar/baz/nls/foo") gives:
			// ["foo/bar/baz/nls/foo", "foo/bar/baz/nls/", "/", "/", "foo", ""]
			// so, if match[5] is blank, it means this is the top bundle definition.
			// courtesy of http://requirejs.org
			/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,

		getAvailableLocales = function(
			root,
			locale,
			bundlePath,
			bundleName
		){
			// summary:
			//		return a vector of module ids containing all available locales with respect to the target locale
			//		For example, assuming:
			//
			//		- the root bundle indicates specific bundles for "fr" and "fr-ca",
			//		-  bundlePath is "myPackage/nls"
			//		- bundleName is "myBundle"
			//
			//		Then a locale argument of "fr-ca" would return
			//
			//			["myPackage/nls/myBundle", "myPackage/nls/fr/myBundle", "myPackage/nls/fr-ca/myBundle"]
			//
			//		Notice that bundles are returned least-specific to most-specific, starting with the root.
			//
			//		If root===false indicates we're working with a pre-AMD i18n bundle that doesn't tell about the available locales;
			//		therefore, assume everything is available and get 404 errors that indicate a particular localization is not available

			for(var result = [bundlePath + bundleName], localeParts = locale.split("-"), current = "", i = 0; i<localeParts.length; i++){
				current += (current ? "-" : "") + localeParts[i];
				if(!root || root[current]){
					result.push(bundlePath + current + "/" + bundleName);
				}
			}
			return result;
		},

		cache = {},

		getBundleName = function(moduleName, bundleName, locale){
			locale = locale ? locale.toLowerCase() : dojo.locale;
			moduleName = moduleName.replace(/\./g, "/");
			bundleName = bundleName.replace(/\./g, "/");
			return (/root/i.test(locale)) ?
				(moduleName + "/nls/" + bundleName) :
				(moduleName + "/nls/" + locale + "/" + bundleName);
		},

		getL10nName = dojo.getL10nName = function(moduleName, bundleName, locale){
			return moduleName = module.id + "!" + getBundleName(moduleName, bundleName, locale);
		},

		doLoad = function(require, bundlePathAndName, bundlePath, bundleName, locale, load){
			// summary:
			//		get the root bundle which instructs which other bundles are required to construct the localized bundle
			require([bundlePathAndName], function(root){
				var current = lang.clone(root.root),
					availableLocales = getAvailableLocales(!root._v1x && root, locale, bundlePath, bundleName);
				require(availableLocales, function(){
					for (var i = 1; i<availableLocales.length; i++){
						current = lang.mixin(lang.clone(current), arguments[i]);
					}
					// target may not have been resolve (e.g., maybe only "fr" exists when "fr-ca" was requested)
					var target = bundlePathAndName + "/" + locale;
					cache[target] = current;
					load();
				});
			});
		},

		normalize = function(id, toAbsMid){
			// summary:
			//		id may be relative.
			//		preload has form `*preload*<path>/nls/<module>*<flattened locales>` and
			//		therefore never looks like a relative
			return /^\./.test(id) ? toAbsMid(id) : id;
		},

		getLocalesToLoad = function(targetLocale){
			var list = config.extraLocale || [];
			list = lang.isArray(list) ? list : [list];
			list.push(targetLocale);
			return list;
		},

		load = function(id, require, load){
			// summary:
			//		id is in one of the following formats
			//
			//		1. <path>/nls/<bundle>
			//			=> load the bundle, localized to config.locale; load all bundles localized to
			//			config.extraLocale (if any); return the loaded bundle localized to config.locale.
			//
			//		2. <path>/nls/<locale>/<bundle>
			//			=> load then return the bundle localized to <locale>
			//
			//		3. *preload*<path>/nls/<module>*<JSON array of available locales>
			//			=> for config.locale and all config.extraLocale, load all bundles found
			//			in the best-matching bundle rollup. A value of 1 is returned, which
			//			is meaningless other than to say the plugin is executing the requested
			//			preloads
			//
			//		In cases 1 and 2, <path> is always normalized to an absolute module id upon entry; see
			//		normalize. In case 3, it <path> is assumed to be absolute; this is arranged by the builder.
			//
			//		To load a bundle means to insert the bundle into the plugin's cache and publish the bundle
			//		value to the loader. Given <path>, <bundle>, and a particular <locale>, the cache key
			//
			//			<path>/nls/<bundle>/<locale>
			//
			//		will hold the value. Similarly, then plugin will publish this value to the loader by
			//
			//			define("<path>/nls/<bundle>/<locale>", <bundle-value>);
			//
			//		Given this algorithm, other machinery can provide fast load paths be preplacing
			//		values in the plugin's cache, which is public. When a load is demanded the
			//		cache is inspected before starting any loading. Explicitly placing values in the plugin
			//		cache is an advanced/experimental feature that should not be needed; use at your own risk.
			//
			//		For the normal AMD algorithm, the root bundle is loaded first, which instructs the
			//		plugin what additional localized bundles are required for a particular locale. These
			//		additional locales are loaded and a mix of the root and each progressively-specific
			//		locale is returned. For example:
			//
			//		1. The client demands "dojo/i18n!some/path/nls/someBundle
			//
			//		2. The loader demands load(some/path/nls/someBundle)
			//
			//		3. This plugin require's "some/path/nls/someBundle", which is the root bundle.
			//
			//		4. Assuming config.locale is "ab-cd-ef" and the root bundle indicates that localizations
			//		are available for "ab" and "ab-cd-ef" (note the missing "ab-cd", then the plugin
			//		requires "some/path/nls/ab/someBundle" and "some/path/nls/ab-cd-ef/someBundle"
			//
			//		5. Upon receiving all required bundles, the plugin constructs the value of the bundle
			//		ab-cd-ef as...
			//
			//				mixin(mixin(mixin({}, require("some/path/nls/someBundle"),
			//		  			require("some/path/nls/ab/someBundle")),
			//					require("some/path/nls/ab-cd-ef/someBundle"));
			//
			//		This value is inserted into the cache and published to the loader at the
			//		key/module-id some/path/nls/someBundle/ab-cd-ef.
			//
			//		The special preload signature (case 3) instructs the plugin to stop servicing all normal requests
			//		(further preload requests will be serviced) until all ongoing preloading has completed.
			//
			//		The preload signature instructs the plugin that a special rollup module is available that contains
			//		one or more flattened, localized bundles. The JSON array of available locales indicates which locales
			//		are available. Here is an example:
			//
			//			*preload*some/path/nls/someModule*["root", "ab", "ab-cd-ef"]
			//
			//		This indicates the following rollup modules are available:
			//
			//			some/path/nls/someModule_ROOT
			//			some/path/nls/someModule_ab
			//			some/path/nls/someModule_ab-cd-ef
			//
			//		Each of these modules is a normal AMD module that contains one or more flattened bundles in a hash.
			//		For example, assume someModule contained the bundles some/bundle/path/someBundle and
			//		some/bundle/path/someOtherBundle, then some/path/nls/someModule_ab would be expressed as follows:
			//
			//			define({
			//				some/bundle/path/someBundle:<value of someBundle, flattened with respect to locale ab>,
			//				some/bundle/path/someOtherBundle:<value of someOtherBundle, flattened with respect to locale ab>,
			//			});
			//
			//		E.g., given this design, preloading for locale=="ab" can execute the following algorithm:
			//
			//			require(["some/path/nls/someModule_ab"], function(rollup){
			//				for(var p in rollup){
			//					var id = p + "/ab",
			//					cache[id] = rollup[p];
			//					define(id, rollup[p]);
			//				}
			//			});
			//
			//		Similarly, if "ab-cd" is requested, the algorithm can determine that "ab" is the best available and
			//		load accordingly.
			//
			//		The builder will write such rollups for every layer if a non-empty localeList  profile property is
			//		provided. Further, the builder will include the following cache entry in the cache associated with
			//		any layer.
			//
			//			"*now":function(r){r(['dojo/i18n!*preload*<path>/nls/<module>*<JSON array of available locales>']);}
			//
			//		The *now special cache module instructs the loader to apply the provided function to context-require
			//		with respect to the particular layer being defined. This causes the plugin to hold all normal service
			//		requests until all preloading is complete.
			//
			//		Notice that this algorithm is rarely better than the standard AMD load algorithm. Consider the normal case
			//		where the target locale has a single segment and a layer depends on a single bundle:
			//
			//		Without Preloads:
			//
			//		1. Layer loads root bundle.
			//		2. bundle is demanded; plugin loads single localized bundle.
			//
			//		With Preloads:
			//
			//		1. Layer causes preloading of target bundle.
			//		2. bundle is demanded; service is delayed until preloading complete; bundle is returned.
			//
			//		In each case a single transaction is required to load the target bundle. In cases where multiple bundles
			//		are required and/or the locale has multiple segments, preloads still requires a single transaction whereas
			//		the normal path requires an additional transaction for each additional bundle/locale-segment. However all
			//		of these additional transactions can be done concurrently. Owing to this analysis, the entire preloading
			//		algorithm can be discard during a build by setting the has feature dojo-preload-i18n-Api to false.

			if(has("dojo-preload-i18n-Api")){
				var split = id.split("*"),
					preloadDemand = split[1] == "preload";
				if(preloadDemand){
					if(!cache[id]){
						// use cache[id] to prevent multiple preloads of the same preload; this shouldn't happen, but
						// who knows what over-aggressive human optimizers may attempt
						cache[id] = 1;
						preloadL10n(split[2], json.parse(split[3]), 1, require);
					}
					// don't stall the loader!
					load(1);
				}
				if(preloadDemand || waitForPreloads(id, require, load)){
					return;
				}
			}

			var match = nlsRe.exec(id),
				bundlePath = match[1] + "/",
				bundleName = match[5] || match[4],
				bundlePathAndName = bundlePath + bundleName,
				localeSpecified = (match[5] && match[4]),
				targetLocale =	localeSpecified || dojo.locale,
				loadTarget = bundlePathAndName + "/" + targetLocale,
				loadList = localeSpecified ? [targetLocale] : getLocalesToLoad(targetLocale),
				remaining = loadList.length,
				finish = function(){
					if(!--remaining){
						load(lang.delegate(cache[loadTarget]));
					}
				};
			array.forEach(loadList, function(locale){
				var target = bundlePathAndName + "/" + locale;
				if(has("dojo-preload-i18n-Api")){
					checkForLegacyModules(target);
				}
				if(!cache[target]){
					doLoad(require, bundlePathAndName, bundlePath, bundleName, locale, finish);
				}else{
					finish();
				}
			});
		};

	if(has("dojo-unit-tests")){
		var unitTests = thisModule.unitTests = [];
	}

	if(has("dojo-preload-i18n-Api") ||  1 ){
		var normalizeLocale = thisModule.normalizeLocale = function(locale){
				var result = locale ? locale.toLowerCase() : dojo.locale;
				return result == "root" ? "ROOT" : result;
			},

			isXd = function(mid, contextRequire){
				return ( 0  &&  1 ) ?
					contextRequire.isXdUrl(require.toUrl(mid + ".js")) :
					true;
			},

			preloading = 0,

			preloadWaitQueue = [],

			preloadL10n = thisModule._preloadLocalizations = function(/*String*/bundlePrefix, /*Array*/localesGenerated, /*boolean?*/ guaranteedAmdFormat, /*function?*/ contextRequire){
				// summary:
				//		Load available flattened resource bundles associated with a particular module for dojo/locale and all dojo/config.extraLocale (if any)
				// description:
				//		Only called by built layer files. The entire locale hierarchy is loaded. For example,
				//		if locale=="ab-cd", then ROOT, "ab", and "ab-cd" are loaded. This is different than v1.6-
				//		in that the v1.6- would only load ab-cd...which was *always* flattened.
				//
				//		If guaranteedAmdFormat is true, then the module can be loaded with require thereby circumventing the detection algorithm
				//		and the extra possible extra transaction.

				// If this function is called from legacy code, then guaranteedAmdFormat and contextRequire will be undefined. Since the function
				// needs a require in order to resolve module ids, fall back to the context-require associated with this dojo/i18n module, which
				// itself may have been mapped.
				contextRequire = contextRequire || require;

				function doRequire(mid, callback){
					if(isXd(mid, contextRequire) || guaranteedAmdFormat){
						contextRequire([mid], callback);
					}else{
						syncRequire([mid], callback, contextRequire);
					}
				}

				function forEachLocale(locale, func){
					// given locale= "ab-cd-ef", calls func on "ab-cd-ef", "ab-cd", "ab", "ROOT"; stops calling the first time func returns truthy
					var parts = locale.split("-");
					while(parts.length){
						if(func(parts.join("-"))){
							return;
						}
						parts.pop();
					}
					func("ROOT");
				}

				function preload(locale){
					locale = normalizeLocale(locale);
					forEachLocale(locale, function(loc){
						if(array.indexOf(localesGenerated, loc)>=0){
							var mid = bundlePrefix.replace(/\./g, "/")+"_"+loc;
							preloading++;
							doRequire(mid, function(rollup){
								for(var p in rollup){
									cache[require.toAbsMid(p) + "/" + loc] = rollup[p];
								}
								--preloading;
								while(!preloading && preloadWaitQueue.length){
									load.apply(null, preloadWaitQueue.shift());
								}
							});
							return true;
						}
						return false;
					});
				}

				preload();
				array.forEach(dojo.config.extraLocale, preload);
			},

			waitForPreloads = function(id, require, load){
				if(preloading){
					preloadWaitQueue.push([id, require, load]);
				}
				return preloading;
			},

			checkForLegacyModules = function()
				{};
	}

	if( 1 ){
		// this code path assumes the dojo loader and won't work with a standard AMD loader
		var amdValue = {},
			evalBundle =
				// use the function ctor to keep the minifiers away (also come close to global scope, but this is secondary)
				new Function(
					"__bundle",				   // the bundle to evalutate
					"__checkForLegacyModules", // a function that checks if __bundle defined __mid in the global space
					"__mid",				   // the mid that __bundle is intended to define
					"__amdValue",

					// returns one of:
					//		1 => the bundle was an AMD bundle
					//		a legacy bundle object that is the value of __mid
					//		instance of Error => could not figure out how to evaluate bundle

					  // used to detect when __bundle calls define
					  "var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},"
					+ "	   require = function(){define.called = 1;};"

					+ "try{"
					+		"define.called = 0;"
					+		"eval(__bundle);"
					+		"if(define.called==1)"
								// bundle called define; therefore signal it's an AMD bundle
					+			"return __amdValue;"

					+		"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"
								// bundle was probably a v1.6- built NLS flattened NLS bundle that defined __mid in the global space
					+			"return __checkForLegacyModules;"

					+ "}catch(e){}"
					// evaulating the bundle was *neither* an AMD *nor* a legacy flattened bundle
					// either way, re-eval *after* surrounding with parentheses

					+ "try{"
					+		"return eval('('+__bundle+')');"
					+ "}catch(e){"
					+		"return e;"
					+ "}"
				),

			syncRequire = function(deps, callback, require){
				var results = [];
				array.forEach(deps, function(mid){
					var url = require.toUrl(mid + ".js");

					function load(text){
						var result = evalBundle(text, checkForLegacyModules, mid, amdValue);
						if(result===amdValue){
							// the bundle was an AMD module; re-inject it through the normal AMD path
							// we gotta do this since it could be an anonymous module and simply evaluating
							// the text here won't provide the loader with the context to know what
							// module is being defined()'d. With browser caching, this should be free; further
							// this entire code path can be circumvented by using the AMD format to begin with
							results.push(cache[url] = amdValue.result);
						}else{
							if(result instanceof Error){
								console.error("failed to evaluate i18n bundle; url=" + url, result);
								result = {};
							}
							// nls/<locale>/<bundle-name> indicates not the root.
							results.push(cache[url] = (/nls\/[^\/]+\/[^\/]+$/.test(url) ? result : {root:result, _v1x:1}));
						}
					}

					if(cache[url]){
						results.push(cache[url]);
					}else{
						var bundle = require.syncLoadNls(mid);
						// don't need to check for legacy since syncLoadNls returns a module if the module
						// (1) was already loaded, or (2) was in the cache. In case 1, if syncRequire is called
						// from getLocalization --> load, then load will have called checkForLegacyModules() before
						// calling syncRequire; if syncRequire is called from preloadLocalizations, then we
						// don't care about checkForLegacyModules() because that will be done when a particular
						// bundle is actually demanded. In case 2, checkForLegacyModules() is never relevant
						// because cached modules are always v1.7+ built modules.
						if(bundle){
							results.push(bundle);
						}else{
							if(!xhr){
								try{
									require.getText(url, true, load);
								}catch(e){
									results.push(cache[url] = {});
								}
							}else{
								xhr.get({
									url:url,
									sync:true,
									load:load,
									error:function(){
										results.push(cache[url] = {});
									}
								});
							}
						}
					}
				});
				callback && callback.apply(null, results);
			};

		checkForLegacyModules = function(target){
			// legacy code may have already loaded [e.g] the raw bundle x/y/z at x.y.z; when true, push into the cache
			for(var result, names = target.split("/"), object = dojo.global[names[0]], i = 1; object && i<names.length-1; object = object[names[i++]]){}
			if(object){
				result = object[names[i]];
				if(!result){
					// fallback for incorrect bundle build of 1.6
					result = object[names[i].replace(/-/g,"_")];
				}
				if(result){
					cache[target] = result;
				}
			}
			return result;
		};

		thisModule.getLocalization = function(moduleName, bundleName, locale){
			var result,
				l10nName = getBundleName(moduleName, bundleName, locale);
			load(
				l10nName,

				// isXd() and syncRequire() need a context-require in order to resolve the mid with respect to a reference module.
				// Since this legacy function does not have the concept of a reference module, resolve with respect to this
				// dojo/i18n module, which, itself may have been mapped.
				(!isXd(l10nName, require) ? function(deps, callback){ syncRequire(deps, callback, require); } : require),

				function(result_){ result = result_; }
			);
			return result;
		};

		if(has("dojo-unit-tests")){
			unitTests.push(function(doh){
				doh.register("tests.i18n.unit", function(t){
					var check;

					check = evalBundle("{prop:1}", checkForLegacyModules, "nonsense", amdValue);
					t.is({prop:1}, check); t.is(undefined, check[1]);

					check = evalBundle("({prop:1})", checkForLegacyModules, "nonsense", amdValue);
					t.is({prop:1}, check); t.is(undefined, check[1]);

					check = evalBundle("{'prop-x':1}", checkForLegacyModules, "nonsense", amdValue);
					t.is({'prop-x':1}, check); t.is(undefined, check[1]);

					check = evalBundle("({'prop-x':1})", checkForLegacyModules, "nonsense", amdValue);
					t.is({'prop-x':1}, check); t.is(undefined, check[1]);

					check = evalBundle("define({'prop-x':1})", checkForLegacyModules, "nonsense", amdValue);
					t.is(amdValue, check); t.is({'prop-x':1}, amdValue.result);

					check = evalBundle("define('some/module', {'prop-x':1})", checkForLegacyModules, "nonsense", amdValue);
					t.is(amdValue, check); t.is({'prop-x':1}, amdValue.result);

					check = evalBundle("this is total nonsense and should throw an error", checkForLegacyModules, "nonsense", amdValue);
					t.is(check instanceof Error, true);
				});
			});
		}
	}

	return lang.mixin(thisModule, {
		dynamic:true,
		normalize:normalize,
		load:load,
		cache:cache
	});
});

},
'*now':function(r){r(['dojo/i18n!*preload*frontend/layer/nls/form-select*["ar","ca","cs","da","de","el","en-gb","en-us","es-es","fi-fi","fr-fr","he-il","hu","it-it","ja-jp","ko-kr","nl-nl","nb","pl","pt-br","pt-pt","ru","sk","sl","sv","th","tr","zh-tw","zh-cn","ROOT"]']);}
}});
define("frontend/layer/form-select", [], 1);
