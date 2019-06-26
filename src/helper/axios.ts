/**
 * axios helper
 * 
 * 2019 kento nomiyama
 */
import base, { AxiosInstance } from 'axios';

import * as constants from 'utils/constants';

export const axios = base.create({
  baseURL: constants.API_ENDPOINT.COMPUTE,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json'
});

export const axiosNoAuth = (type?: string): AxiosInstance => {
  let url = getBaseUrl(type);

  if (!url) {
    url = constants.API_ENDPOINT.COMPUTE;
  }

  return base.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  });
};

export const axiosAuth = (token: string, type?: string): AxiosInstance => {
  let url = getBaseUrl(type);

  if (!url) {
    url = constants.API_ENDPOINT.COMPUTE;
  }

  return base.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    },
    responseType: 'json'
  });
};

const getBaseUrl = (type?: string): string | undefined => {
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