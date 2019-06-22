"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const constants = __importStar(require("../utils/constants"));
exports.authHelper = () => {
    const config = JSON.parse(fs.readFileSync(constants.CREDENTIAL_FILE, 'utf8'));
    if (!config) {
        throw 'authHelper';
    }
    const authModel = {
        username: config.account,
        password: config.password
    };
    let appKey = config.appkey;
    return { authModel, appKey };
};
