/**
 * compute service 
 * 
 * 2019 kento nomiyama
 */
import fs from 'fs';

import * as Response from 'common/response';
import { authHelper } from 'helper/auth';
import * as axios from 'helper/axios';
import * as flavor from 'model/flavor';
import * as keyPair from 'model/keyPair';
import * as zone from 'model/zone';

export const executeComputeApi = async (token: string, opts: string[]): Promise<void> => {
  let options = opts;
  const service = options[0];

  options.splice(0, 1);

  switch(service) {
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

const executeKeyPairs = async (token: string, action: string, args: string[]): Promise<void> => {
  const opts: keyPair.Model = {};
  for(let i = 0; i < args.length; i += 2) {
    switch(args[i]) {
      case '--name':
        opts.name = args[i+1];
        break;
      case '--publickey':
        opts.publicKey = fs.readFileSync(args[i+1], 'utf8');
        break;
      default:
    }
  }

  switch(action) {
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
      })
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

interface ShowKeyPairsArgument {
  token: string;
  name?: string;
};

const showKeyPairs = async(args: ShowKeyPairsArgument): Promise<void> => {
  const { name, token } = args;
  const { appKey } = authHelper();
  const authHttpClient = axios.axiosAuth(token);
  
  let response;
  if (name) {
    response = await authHttpClient.get(`/compute/v1.0/appkeys/${appKey}/keypairs`, { params: { name } });
  } else {
    response = await authHttpClient.get(`/compute/v1.0/appkeys/${appKey}/keypairs`);
  }

  if (response.status != 200) {
    throw `Error response: ${response.status}`;
  }

  const data: Response.KeyPairModel = response.data; 
  if (!data.header.isSuccessful && !data.keypairs) {
    throw `isFailed: ${data.header.resultMessage}`;
  }

  const KeyPairModel = data.keypairs;

  if (!KeyPairModel) {
    console.log([]);
  } else {
    console.log(JSON.stringify(KeyPairModel));
  }
};

interface CreateKeyPairArguments {
  token: string;
  name?: string;
  publicKey?: string;
};

const createKeyPair = async(args: CreateKeyPairArguments): Promise<void> => {
  const { name, token, publicKey } = args;
  const { appKey } = authHelper();
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

  const data: Response.KeyPairModel = response.data; 
  if (!data.header.isSuccessful && !data.keypair) {
    throw `isFailed: ${data.header.resultMessage}`;
  }

  const KeyPairModel = data.keypair;

  if (KeyPairModel) {
    console.log(JSON.stringify(KeyPairModel));
  }
};

interface DeleteKeyPairArguments {
  token: string;
  name?: string;
};

const deleteKeyPair = async(args: DeleteKeyPairArguments): Promise<void> => {
  const { name, token } = args;
  const { appKey } = authHelper();
  const authHttpClient = axios.axiosAuth(token);
  
  if (!name) {
    throw 'keypair name is not defined';
  }

  const response = await authHttpClient.delete(`/compute/v1.0/appkeys/${appKey}/keypairs`, { params: { name } });

  if (response.status != 200) {
    throw `Error response: ${response.status}`;
  }

  const data: Response.KeyPairModel = response.data; 
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
  console.log('');
};