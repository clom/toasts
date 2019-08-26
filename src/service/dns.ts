/**
 * dns service 
 * 
 * 2019 kento nomiyama
 */

import * as Response from 'common/response';
import { authHelper } from 'helper/auth';
import * as axios from 'helper/axios';
import * as dnsRecord from 'model/dnsRecord';
import * as dnsRecordSet from 'model/dnsRecordSet';
import * as dnsZone from 'model/dnsZone';

export const executeDnsApi = async (opts: string[]): Promise<void> => {
  let options = opts;
  const service = options[0];
  const action = options[1];

  options.splice(0, 2);

  const { dnsAppKey } = authHelper();

  if (!dnsAppKey){
    throw `Error: no dnsKey`;
  }

  switch(service) {
    case 'zones':
      executeDnsZones(dnsAppKey, action, options);
      break;
    case 'records':
      executeDnsRecords(dnsAppKey, action, options);
      break;
    default:
      defaultHelp();
      break;
  }
};

const executeDnsZones = async (appKey: string, action: string, args: string[]): Promise<void> => {
  const opts: dnsZone.Model = {};
  for(let i = 0; i < args.length; i += 2) {
    switch(args[i]) {
      case '--zone-name':
        opts.zoneName = args[i+1];
        break;
      case '--description':
        opts.description = args[i+1];
        break;
      case '--zone-id':
        opts.zoneId = args[i+1];
      default:
    }
  }

  switch(action) {
    case 'show':
      showDnsZone(appKey, args);
      break;
    case 'create':
      break;
    case 'delete':
      break;
    default:
      dnsZonesHelp();
      break;
  }
};

interface RequestDnsZoneArgument {
  zoneIdList?: string[];
  zoneStatusList?: string[];
  searchZoneName?: string;
  engineId?: string;
  page?: number;
  limit?: number;
  sortDirection?: string;
  sortKey?: string;
}

const showDnsZone = async (appKey: string, args: string[]): Promise<void> => {
  const opts: RequestDnsZoneArgument = {};
  for(let i = 0; i < args.length; i += 2) {
    switch(args[i]) {
      case '--zone-id':
        if(!opts.zoneIdList || opts.zoneIdList.length < 1) {
          opts.zoneIdList = [];
        }
        opts.zoneIdList.push(args[i+1]);
        break;
      case '--zone-status':
        if(!opts.zoneStatusList || opts.zoneStatusList.length < 1) {
          opts.zoneStatusList = [];
        }
        opts.zoneStatusList.push(args[i+1]);
        break;
      case '--zone-name':
        opts.searchZoneName = args[i+1];
        break
      case '--engine-id':
        opts.engineId = args[i+1];
        break
      case '--page':
        opts.page = Number(args[i+1]);
        break
      case '--limit':
        opts.limit = Number(args[i+1]);
        break
      case '--sort-direction':
        if(args[i+1] === 'ASC' || args[i+1] === 'asc') {
          opts.sortDirection = 'ASC';
        } else {
          opts.sortDirection = 'DESC';
        }
        break
      case '--sort-key':
        opts.searchZoneName = args[i+1];
        break
      default:
    }
  }
};

const executeDnsRecords = async (appKey: string, action: string, args: string[]): Promise<void> => {
  const opts: dnsRecordSet.Model = {};
  for(let i = 0; i < args.length; i += 2) {
    switch(args[i]) {
      case '--zone-name':
        break;
      case '--description':
        break;
      case '--zone-id':
      default:
    }
  }

  switch(action) {
    case 'show':
      break;
    case 'create':
      break;
    case 'delete':
      break;
    default:
      dnsZonesHelp();
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

const dnsRecordsHelp = () => {
  console.log('===== TOAST DNS Record Service =====');
  console.log('usage: toasts dns records ${actions} [options]');
  console.log('');
  console.log('------ select actions ------');
  console.log('show: show DNS Records');
  console.log('create: create DNS Record');
  console.log('update: update DNS Record');
  console.log('delete: delete DNS Record');
  console.log('');
};

const dnsZonesHelp = () => {
  console.log('===== TOAST DNS Zone Service =====');
  console.log('usage: toasts dns zones ${actions} [options]');
  console.log('');
  console.log('------ select actions ------');
  console.log('show: show DNS Zones');
  console.log('create: create DNS Zones');
  console.log('update: update DNS Zones');
  console.log('delete: delete DNS Zones');
  console.log('');
};
