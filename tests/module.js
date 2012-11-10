define([
    "require",
    "doh/main"
], function (require, doh) {
    "use strict";
    
    if(doh.isBrowser) {
        doh.register("dojo-form-controls/Button", "../../../../tests/Button.html", 30000);
        doh.register("dojo-form-controls/Checkbox", "../../../../tests/Checkbox.html", 30000);
        doh.register("dojo-form-controls/Radio", "../../../../tests/Radio.html", 30000);
        doh.register("dojo-form-controls/Select", "../../../../tests/Select.html", 30000);
        doh.register("dojo-form-controls/Textarea", "../../../../tests/Textarea.html", 30000);
        doh.register("dojo-form-controls/Textbox", "../../../../tests/Textbox.html", 30000);
	}
});
