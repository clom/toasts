/**
 * user model
 */
import * as role from 'model/role';

export interface Model {
  'id': string;
  'roles': role.Model[];
};
