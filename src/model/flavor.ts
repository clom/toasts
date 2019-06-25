/**
 * flavor model
 */

export interface Model {
  disables: boolean;
  ephemeral: number;
  type?: string;
  volumeSize?: number;
  id: string;
  name: string;
  isPublic: boolean;
  ram: number;
  vcpus: number;
};
