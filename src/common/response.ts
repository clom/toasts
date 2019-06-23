/**
 * response model
 */
import * as access from 'model/access';
import * as flavor from 'model/flavor';
import * as header from 'model/header';
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

export interface FlavorModel extends BaseModel {
  flavors: flavor.Model[];
}