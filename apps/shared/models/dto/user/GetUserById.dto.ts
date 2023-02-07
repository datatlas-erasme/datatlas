export class UserByIdDto {
  readonly idUser: number;

  constructor(private user_id: number) {
    this.idUser = user_id;
  }
}
