/**
 * response model
 */
import * as access from 'model/access';
import * as dnsZone from 'model/dnsZone';
import * as dnsRecord from 'model/dnsRecordSet';
import * as flavor from 'model/flavor';
import * as header from 'model/header';
import * as keyPair from 'model/keyPair';
import * as zone from 'model/zone';

export interface BaseModel {
  header : header.Model;
};

export interface AuthModel extends BaseModel {
  access: access.Model;
}

export interface AvailabilityZoneModel extends BaseModel {
  zones: zone.Model[];
}

export interface DnsZoneModel extends BaseModel {
  totalCount?: number;
  zoneList?: dnsZone.Model[];
}

export interface DnsRecordSetModel extends BaseModel {
  totalCount?: number;
  recordsetList?: dnsRecord.Model[];
}

export interface FlavorModel extends BaseModel {
  flavors: flavor.Model[];
}

export interface KeyPairModel extends BaseModel {
  keypairs?: keyPair.Model[];
  keypair?: keyPair.Model;
}
