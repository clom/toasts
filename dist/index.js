"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService = __importStar(require("./service/auth"));
const computeService = __importStar(require("./service/compute"));
exports.command = async (argv) => {
    try {
        const service = argv[0];
        argv.splice(0, 1);
        const options = argv;
        const token = await authService.createToken();
        switch (service) {
            case 'token':
                console.log(`TOAST TOKEN: ${token}`);
                break;
            case 'compute':
                await computeService.executeComputeApi(token, options);
                break;
            default:
                console.log('INFO: This service is undefined.');
                console.log('INFO: Please select TOAST services.');
                break;
        }
    }
    catch (e) {
        console.error('ERROR: ' + e);
    }
};
const args = process.argv;
args.splice(0, 2);
exports.command(args);
