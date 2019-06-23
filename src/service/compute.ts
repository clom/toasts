/**
 * compute service 
 * 
 * 2019 kento nomiyama
 */
import * as Response from 'common/response';
import { authHelper } from 'helper/auth';
import * as axios from 'helper/axios';
import * as flavor from 'model/flavor';
import * as zone from 'model/zone';

export const executeComputeApi = async (token: string, opts: string[]): Promise<void> => {
  let options = opts;
  const service = options[0];

  options.splice(0, 1);

  switch(service) {
    case 'availability-zones':
      showAvailabilityZone(token);
      break;
    case 'flavors':
      showFlavors(token);
      break;
    default:
      defaultHelp();
      break;
  }
};

const showAvailabilityZone = async(token: string): Promise<void> => {
  const { appKey } = authHelper();
  const authHttpClient = axios.axiosAuth(token);
  const response = await authHttpClient.get(`/compute/v1.0/appkeys/${appKey}/availability-zones`);

  if (response.status != 200) {
    throw `Error response: ${response.status}`;
  }

  const data: Response.AvailabilityZoneModel = response.data; 
  if(!data.header.isSuccessful && !data.zones) {
    throw `isFailed: ${data.header.resultMessage}`;
  }

  const zoneModels : zone.Model[] = data.zones;

  console.log(JSON.stringify(zoneModels));
};

const showFlavors = async(token: string): Promise<void> => {
  const { appKey } = authHelper();
  const authHttpClient = axios.axiosAuth(token);
  const response = await authHttpClient.get(`/compute/v1.0/appkeys/${appKey}/flavors`);

  if (response.status != 200) {
    throw `Error response: ${response.status}`;
  }

  const data: Response.FlavorModel = response.data; 
  if(!data.header.isSuccessful && !data.flavors) {
    throw `isFailed: ${data.header.resultMessage}`;
  }

  const flavorModels : flavor.Model[] = data.flavors;

  console.log(JSON.stringify(flavorModels));
};

const defaultHelp = () => {
  console.log('===== TOAST compute Service =====');
  console.log('usage: toasts compute ${service} [options]');
  console.log('');
  console.log('------ select serivces ------');
  console.log('availability-zones: show availbility zone information');
  console.log('flavors: show instance flavors information');
  console.log('');
};