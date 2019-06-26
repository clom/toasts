/**
 * helper
 */
import * as fs from 'fs'

import * as auth from 'model/auth';
import * as constants from 'utils/constants';

export const authHelper = (): {authModel: auth.Model, appKey?: string, dnsAppKey?: string} => {
  const config = JSON.parse(fs.readFileSync(constants.CREDENTIAL_FILE, 'utf8'));

  if (!config) {
    throw 'authHelper';
  }

  const authModel: auth.Model = {
    username: config.account,
    password: config.password
  };
  let appKey = config.appkey;
  let dnsAppKey = config.dnsAppKey;

  return {authModel, appKey, dnsAppKey};
}
