import { Entity, EntityRepositoryType, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { UserRepository } from '../user.repository';
import { Roles, UserCredentialsInterface, UserInterface } from '@datatlas/models';
import { ProjectEntity } from '../../project/entities/project.entity';

@Entity({ customRepository: () => UserRepository })
export class UserEntity implements Partial<UserInterface> {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id: number;

  @Property()
  @Unique()
  email: string;

  @Property({ nullable: true })
  name?: string;

  @Property({ hidden: true })
  password: string;

  @Property()
  role: Roles = Roles.EDITOR;

  @Property()
  active = true;

  constructor(user: UserInterface) {
    Object.assign(this, user);
  }

  static canEditProject(user: UserCredentialsInterface, project: ProjectEntity) {
    return (!project.isOwnedBy(user) || user.role === Roles.ADMIN) && user.active;
  }

  canEditProject(project: ProjectEntity) {
    return UserEntity.canEditProject(this, project);
  }
}
