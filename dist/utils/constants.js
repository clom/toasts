"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(require("os"));
exports.API_ENDPOINT = 'https://api-compute.cloud.toast.com';
exports.CREDENTIAL_FILE = `${os.userInfo().homedir}/.toasts`;
exports.RESULT_CODE = {
    SUCCESS: 0,
    FAIL: -1,
    UNKNOWN_EXCEPTION: -2,
    PERMISSION_DENIED: -3,
    INVALID_PARAMETERS: -4,
    NONEXISTENT: -5,
    FAIL_TO_QUERY: -6,
    NOT_SUPPORTED: -7,
    JSON_PARSE_ERROR: -8
};
