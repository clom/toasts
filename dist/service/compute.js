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
const fs_1 = __importDefault(require("fs"));
const auth_1 = require("../helper/auth");
const axios = __importStar(require("../helper/axios"));
exports.executeComputeApi = async (token, opts) => {
    let options = opts;
    const service = options[0];
    options.splice(0, 1);
    switch (service) {
        case 'availability-zones':
            await showAvailabilityZone(token);
            break;
        case 'flavors':
            await showFlavors(token);
            break;
        case 'keypairs':
            const action = options[0];
            options.splice(0, 1);
            await executeKeyPairs(token, action, options);
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
const showFlavors = async (token) => {
    const { appKey } = auth_1.authHelper();
    const authHttpClient = axios.axiosAuth(token);
    const response = await authHttpClient.get(`/compute/v1.0/appkeys/${appKey}/flavors`);
    if (response.status != 200) {
        throw `Error response: ${response.status}`;
    }
    const data = response.data;
    if (!data.header.isSuccessful && !data.flavors) {
        throw `isFailed: ${data.header.resultMessage}`;
    }
    const flavorModels = data.flavors;
    console.log(JSON.stringify(flavorModels));
};
const executeKeyPairs = async (token, action, args) => {
    const opts = {};
    for (let i = 0; i < args.length; i += 2) {
        switch (args[i]) {
            case '--name':
                opts.name = args[i + 1];
                break;
            case '--publickey':
                opts.publicKey = fs_1.default.readFileSync(args[i + 1], 'utf8');
                break;
            default:
        }
    }
    switch (action) {
        case 'show':
            await showKeyPairs({
                token,
                name: opts.name
            });
            break;
        case 'create':
            await createKeyPair({
                token,
                name: opts.name,
                publicKey: opts.publicKey
            });
            break;
        case 'delete':
            await deleteKeyPair({
                token,
                name: opts.name
            });
            break;
        default:
            console.log('===== keyPair service =====');
            console.log('usage: toasts compute keypairs ${action} [options]');
            console.log('');
            console.log('----- actions -----');
            console.log('show: show keypairs');
            console.log('create: create keypairs');
            console.log('delete: delete keypairs');
            console.log('');
            console.log('----- options -----');
            console.log('--name: keypair name');
            console.log('--publickey: publickey filename');
            console.log('');
            break;
    }
};
;
const showKeyPairs = async (args) => {
    const { name, token } = args;
    const { appKey } = auth_1.authHelper();
    const authHttpClient = axios.axiosAuth(token);
    let response;
    if (name) {
        response = await authHttpClient.get(`/compute/v1.0/appkeys/${appKey}/keypairs`, { params: { name } });
    }
    else {
        response = await authHttpClient.get(`/compute/v1.0/appkeys/${appKey}/keypairs`);
    }
    if (response.status != 200) {
        throw `Error response: ${response.status}`;
    }
    const data = response.data;
    if (!data.header.isSuccessful && !data.keypairs) {
        throw `isFailed: ${data.header.resultMessage}`;
    }
    const KeyPairModel = data.keypairs;
    if (!KeyPairModel) {
        console.log([]);
    }
    else {
        console.log(JSON.stringify(KeyPairModel));
    }
};
;
const createKeyPair = async (args) => {
    const { name, token, publicKey } = args;
    const { appKey } = auth_1.authHelper();
    const authHttpClient = axios.axiosAuth(token);
    if (!name) {
        throw 'keypair name is not defined';
    }
    if (!publicKey) {
        throw 'keypair publickey is not defined';
    }
    const response = await authHttpClient.post(`/compute/v1.0/appkeys/${appKey}/keypairs`, { keypair: { name, publicKey } });
    if (response.status != 200) {
        throw `Error response: ${response.status}`;
    }
    const data = response.data;
    if (!data.header.isSuccessful && !data.keypair) {
        throw `isFailed: ${data.header.resultMessage}`;
    }
    const KeyPairModel = data.keypair;
    if (KeyPairModel) {
        console.log(JSON.stringify(KeyPairModel));
    }
};
;
const deleteKeyPair = async (args) => {
    const { name, token } = args;
    const { appKey } = auth_1.authHelper();
    const authHttpClient = axios.axiosAuth(token);
    if (!name) {
        throw 'keypair name is not defined';
    }
    const response = await authHttpClient.delete(`/compute/v1.0/appkeys/${appKey}/keypairs`, { params: { name } });
    if (response.status != 200) {
        throw `Error response: ${response.status}`;
    }
    const data = response.data;
    if (!data.header.isSuccessful) {
        throw `isFailed: ${data.header.resultMessage}`;
    }
    console.log(data.header.resultMessage);
};
const defaultHelp = () => {
    console.log('===== TOAST compute Service =====');
    console.log('usage: toasts compute ${service} [options]');
    console.log('');
    console.log('------ select serivces ------');
    console.log('availability-zones: show availbility zone information');
    console.log('flavors: show instance flavors information');
    console.log('keypairs: manage key pairs');
    console.log('');
};
