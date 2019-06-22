/**
 * auth service
 * 
 * 2019 kento nomiyama
 */
import * as Response from 'common/response';
import { authHelper } from 'helper/auth';
import { axios } from 'helper/axios';
import * as access from 'model/access';

export const createToken = async (): Promise<string> => {
  const { appKey, authModel } = authHelper();
 
  const response = await axios.post(`/compute/v1.0/appkeys/${appKey}/tokens`, { auth: authModel});

  if (response.status != 200) {
    throw `Error response: ${response.status}`;
  }

  const data: Response.AuthModel = response.data; 
  if(!data.header.isSuccessful && !data.access) {
    throw `isFailed: ${data.header.resultMessage}`;
  }

  const accessModel : access.Model = data.access; 

  return accessModel.token.id;
};
