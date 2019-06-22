/**
 * toast client for TypeScript
 * 
 * 2019 K.Nomiyama
 * 
 */

import * as authService from 'service/auth';

export const command = async (argv: string[]): Promise<void> => {
  // service name
  const service = argv[0];
  argv.splice(0,1);

  // options
  const options = argv;

  try{
    // service checker
    switch (service) {
      case 'token':
        const token = await authService.createToken();
        console.log(`TOAST TOKEN: ${token}`);
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

