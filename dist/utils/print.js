"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJson = (obj) => {
    if (!obj) {
        console.log([]);
    }
    else {
        console.log(JSON.stringify(obj, null, 4));
    }
};
