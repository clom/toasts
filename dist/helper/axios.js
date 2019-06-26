"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const constants = __importStar(require("../utils/constants"));
exports.axios = axios_1.default.create({
    baseURL: constants.API_ENDPOINT.COMPUTE,
    headers: {
        'Content-Type': 'application/json',
    },
    responseType: 'json'
});
exports.axiosNoAuth = (type) => {
    let url = getBaseUrl(type);
    if (!url) {
        url = constants.API_ENDPOINT.COMPUTE;
    }
    return axios_1.default.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json'
        },
        responseType: 'json'
    });
};
exports.axiosAuth = (token, type) => {
    let url = getBaseUrl(type);
    if (!url) {
        url = constants.API_ENDPOINT.COMPUTE;
    }
    return axios_1.default.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        },
        responseType: 'json'
    });
};
const getBaseUrl = (type) => {
    if (!type) {
        return;
    }
    switch (type) {
        case 'compute':
            return constants.API_ENDPOINT.COMPUTE;
        case 'dns':
            return constants.API_ENDPOINT.DNSPLUS;
        default:
            return;
    }
};
