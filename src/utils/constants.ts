/**
 * Constants 
 * 
 * 2019 K.Nomiyama
 */
import * as os from 'os';

export const API_ENDPOINT = {
  COMPUTE: 'https://api-compute.cloud.toast.com',
  DNSPLUS: 'https://api-dnsplus.cloud.toast.com'
};

export const CREDENTIAL_FILE = `${ os.userInfo().homedir }/.toasts`;

export const RESULT_CODE = {
  SUCCESS: 0,
  FAIL: -1,
  UNKNOWN_EXCEPTION: -2,
  PERMISSION_DENIED: -3,
  INVALID_PARAMETERS: -4,
  NONEXISTENT: -5,
  FAIL_TO_QUERY: -6,
  NOT_SUPPORTED: -7,
  JSON_PARSE_ERROR: -8
};
