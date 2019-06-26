/**
 * dns service 
 * 
 * 2019 kento nomiyama
 */

import * as Response from 'common/response';
import { authHelper } from 'helper/auth';
import * as axios from 'helper/axios';

export const executeDnsApi = async (opts: string[]): Promise<void> => {
  let options = opts;
  const service = options[0];

  options.splice(0, 1);

  const { dnsAppKey } = authHelper();

  if (!dnsAppKey){
    throw `Error: no dnsKey`;
  }

  switch(service) {
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
