/**
 * DNS Zone model
 */

export interface Model {
  engineId?: string;
  zoneId?: string;
  zoneName: string;
  zoneStatus?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  recordsetCount?: number;
};
