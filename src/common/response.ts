/**
 * response model
 */
import * as access from 'model/access';
import * as header from 'model/header';

export interface BaseModel {
  "header" : header.Model;
};

export interface AuthModel extends BaseModel {
  access: access.Model;
}
