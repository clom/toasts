"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../helper/auth");
exports.executeDnsApi = async (opts) => {
    let options = opts;
    const service = options[0];
    options.splice(0, 1);
    const { dnsAppKey } = auth_1.authHelper();
    if (!dnsAppKey) {
        throw `Error: no dnsKey`;
    }
    switch (service) {
        case 'zones':
            break;
        case 'records':
            break;
        default:
            defaultHelp();
            break;
    }
};
const defaultHelp = () => {
    console.log('===== TOAST DNS Service =====');
    console.log('usage: toasts dns ${service} [options]');
    console.log('');
    console.log('------ select serivces ------');
    console.log('zones: manage DNS zone information');
    console.log('records: manage DNS records information');
    console.log('');
};
