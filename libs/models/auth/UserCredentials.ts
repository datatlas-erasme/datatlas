/* eslint-disable @typescript-eslint/no-empty-interface */
import { Roles } from '../user';
import { ProjectInterface } from '../ProjectInterface';
import { UserCredentialsInterface } from './UserCredentialsInterface';

export class UserCredentials implements UserCredentialsInterface {
  active: boolean;
  email: string;
  id: number;
  role: Roles;

  constructor(userCredentials: UserCredentialsInterface) {
    this.active = userCredentials.active;
    this.email = userCredentials.email;
    this.id = userCredentials.id;
    this.role = userCredentials.role;
  }

  static canEditProject(user: UserCredentials, project: ProjectInterface) {
    console.log('can edit static');
    return (user.id === project.owner.id || user.role === Roles.ADMIN) && user.active;
  }

  canEditProject(project: ProjectInterface) {
    console.log('can edit objet');
    return UserCredentials.canEditProject(this, project);
  }
}
