/**
 * axios helper
 * 
 * 2019 kento nomiyama
 */
import base from 'axios';

import * as constants from 'utils/constants';

export const axios = base.create({
  baseURL: constants.API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json'
});
