/* eslint-disable @typescript-eslint/no-empty-interface */
import { UserInterface } from '../UserInterface';

export interface UserCredentialsInterface extends Pick<UserInterface, 'id' | 'email' | 'role' | 'active'> {}
