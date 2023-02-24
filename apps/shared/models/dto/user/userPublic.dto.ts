export class UserPublicDTO {
  readonly userid: number;
  readonly username: string;
  readonly role: string;
  readonly active: boolean;

  constructor(userId: number, userName: string, userRole: string, userIsActive: boolean) {
    this.userid = userId;
    this.username = userName;
    this.role = userRole;
    this.active = userIsActive;
  }
}
