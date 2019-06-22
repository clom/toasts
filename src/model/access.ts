/**
 * access model
 */

import * as token from 'model/token';
import * as user from 'model/user';

export interface Model {
  'token': token.Model;
  'user': user.Model;
};
