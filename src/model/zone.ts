/**
 * zone model
 */
import * as zoneState from 'model/zoneState';

export interface Model {
  zoneName: string;
  zoneState: zoneState.Model;
};
