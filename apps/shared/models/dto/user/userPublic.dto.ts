export class UserPublicDTO {
  readonly userid: number;
  readonly username: string;
  readonly role: string;
  readonly active: boolean;

  constructor(user_id: number, user_name: string, user_role: string, user_is_active: boolean) {
    this.userid = user_id;
    this.username = user_name;
    this.role = user_role;
    this.active = user_is_active;
  }
}
