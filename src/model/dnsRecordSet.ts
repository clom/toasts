/**
 * DNS Record Set model
 */

import * as dnsRecord from 'model/dnsRecord';

export interface Model {
  recordsetId?: string;
  recordsetName?: string;
  recordsetType?: string;
  recordsetTtl?: number;
  recordsetStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  recordList?: dnsRecord.Model[];
};
