(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.addEventListener = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = addEventListener;
    function addEventListener(node, eventName, handler, options) {
        node.addEventListener(eventName, handler, options);
        return {
            removeEventListener: function removeEventListener() {
                node.removeEventListener(eventName, handler, options);
            }
        };
    }
});