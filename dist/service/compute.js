"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../helper/auth");
const axios = __importStar(require("../helper/axios"));
exports.executeComputeApi = async (token, opts) => {
    let options = opts;
    const service = options[0];
    options.splice(0, 1);
    switch (service) {
        case 'availability-zones':
            showAvailabilityZone(token);
            break;
        default:
            defaultHelp();
            break;
    }
};
const showAvailabilityZone = async (token) => {
    const { appKey } = auth_1.authHelper();
    const authHttpClient = axios.axiosAuth(token);
    const response = await authHttpClient.get(`/compute/v1.0/appkeys/${appKey}/availability-zones`);
    if (response.status != 200) {
        throw `Error response: ${response.status}`;
    }
    const data = response.data;
    if (!data.header.isSuccessful && !data.zones) {
        throw `isFailed: ${data.header.resultMessage}`;
    }
    const zoneModels = data.zones;
    console.log(JSON.stringify(zoneModels));
};
const defaultHelp = () => {
    console.log('===== TOAST compute Service =====');
    console.log('usage: toasts compute ${servcice} [options]');
    console.log('');
    console.log('------ select serivces ------');
    console.log('availability-zones: show availbility zone information');
    console.log('');
};
