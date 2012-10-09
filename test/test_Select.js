require([
    "dijitive/Select",
    "dojo/store/Memory",
    "dojo/store/JsonRest",
    "dojo/data/ObjectStore",
    "dijit/registry",
    "dojo/parser",
    "dojo/query",
    "dojo/on",
    "dojo/domReady!"
], function (
    Select,
    Memory,
    JsonRest,
    ObjectStore,
    registry,
    parser,
    query,
    on
) {
    "use strict";
    
    parser.parse();
    
    var options = [
        {
            value: '',
            label: 'Please select'
        },
        {
            value: "a",
            label: "A"
        },
        {
            value: "b",
            label: "B"
        },
        {
            value: "c",
            label: "C",
            disabled: true
        },
        {
            value: "d",
            label: "D"
        }
    ];

    var sStore = new ObjectStore(new Memory({
        data: [
            {
                id: "",
                label: 'Please select'
            },
            {
                id: "a",
                label: "A"
            },
            {
                id: "b",
                label: "B"
            },
            {
                id: "c",
                label: "C"
            },
            {
                id: "d",
                label: "D"
            }
        ]
    }));
    
    var aStore = new ObjectStore(new JsonRest({
        target: 'test_Select.json'
    }));
    
    // simple
    var w1 = new Select({
        baseClass: 'a-simple-select',
        name: 'xxx',
        value: 'a',
        options: options,
        required: true,
        onChange: function (value) {
            console.log('onChange(): ' + value)
        }
    }, 'w1');
    
    w1.watch('value', function (prop, oldVal, val) {
        console.log('watch("value")', prop, oldVal, val);
    });
    
    w1.watch('message', function (prop, oldVal, val) {
        console.log('watch("message"):', val);
    });
    
    w1.startup();
    
    // multiple
    var w2 = new Select({
        multiple: true,
        name: 'yyy',
        value: ['a', 'd'],
        options: options,
        required: true,
        onChange: function (value) {
            console.log('onChange(): ' + value)
        }
    }, 'w2');
    
    w2.watch('value', function (prop, oldVal, val) {
        console.log('watch("value"):', val);
    });
    
    w2.watch('message', function (prop, oldVal, val) {
        console.log('watch("message"):', val);
    });
    
    w2.startup();
    
    // multiple backed by synchronous store
    var w3 = new Select({
        multiple: true,
        name: 'xxx',
        value: 'a',
        store: sStore,
        required: true,
        onChange: function (value) {
            console.log('onChange(): ' + value)
        }
    }, 'w3');
    
    w3.watch('value', function (prop, oldVal, val) {
        console.log('watch("value"):', val);
    });
    
    w3.watch('message', function (prop, oldVal, val) {
        console.log('watch("message"):', val);
    });
    
    w3.startup();
    
    setTimeout(function () {
        //w3.set('value', ['b','d']);
    }, 1000)
    
    // simple backed by asynchronous store
    var w4 = new Select({
        name: 'xxx',
        value: 'd',
        store: aStore,
        required: true,
        onChange: function (value) {
            console.log('onChange(): ' + value)
        }
    }, 'w4');
    
    w4.watch('value', function (prop, oldVal, val) {
        console.log('watch("value"):', val);
    });
    
    w4.watch('message', function (prop, oldVal, val) {
        console.log('watch("message"):', val);
    });
    
    w4.startup();
    
    // disabled
    var w5 = new Select({
        name: 'zzz',
        value: 'a',
        options: options,
        disabled: true,
        onChange: function (value) {
            console.log('onChange(): ' + value)
        }
    }, 'w5');
    
    w5.watch('value', function (prop, oldVal, val) {
        console.log('watch("value"):', val);
    });
    
    w5.watch('message', function (prop, oldVal, val) {
        console.log('watch("message"):', val);
    });
    
    w5.startup();
    
    // declarative single
    registry.byId('w6').onChange = function (value) {
        console.log('onChange(): ' + value)
    };
    
    registry.byId('w6').watch('value', function (prop, oldVal, val) {
        console.log('watch("value"):', val);
    });
    
    registry.byId('w6').watch('message', function (prop, oldVal, val) {
        console.log('watch("message"):', val);
    });
    
    // declarative multiple
    registry.byId('w7').onChange = function (value) {
        console.log('onChange(): ' + value)
    };
    
    registry.byId('w7').watch('value', function (prop, oldVal, val) {
        console.log('watch("value"):', val);
    });
    
    registry.byId('w7').watch('message', function (prop, oldVal, val) {
        console.log('watch("message"):', val);
    });
});