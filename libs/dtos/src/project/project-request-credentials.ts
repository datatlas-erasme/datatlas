import { UserId } from '@datatlas/models';

export interface ProjectRequestCredentials {
  ownerId: UserId;
  contributorsIds: UserId[];
}
