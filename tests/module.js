define([
    "require",
    "doh/main"
], function (require, doh) {
    "use strict";
    
    if(doh.isBrowser) {
        doh.register("dijitive/Button", "../../../../tests/Button.html", 30000);
        doh.register("dijitive/Checkbox", "../../../../tests/Checkbox.html", 30000);
        doh.register("dijitive/Radio", "../../../../tests/Radio.html", 30000);
        doh.register("dijitive/Select", "../../../../tests/Select.html", 30000);
        doh.register("dijitive/Textarea", "../../../../tests/Textarea.html", 30000);
        doh.register("dijitive/Textbox", "../../../../tests/Textbox.html", 30000);
	}
});
