/**
 * toast client for TypeScript
 * 
 * 2019 K.Nomiyama
 * 
 */

import * as authService from 'service/auth';
import * as computeService from 'service/compute';

export const command = async (argv: string[]): Promise<void> => {
  try{
    // service name
    const service = argv[0];
    argv.splice(0,1);

    // options
    const options = argv;
    const token = await authService.createToken();


    // service checker
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
  } catch (e) {
    console.error('ERROR: ' + e);
  }

};

const args: Array<string> = process.argv
args.splice(0,2);

command(args);

