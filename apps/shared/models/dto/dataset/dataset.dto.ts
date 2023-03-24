export class DatasetDto {
  constructor(
    public url : string,
    public updatedAt: string,
    public checksum: string,
    public warning: string

  ) {
    this.url = url;
    this.updatedAt = updatedAt;
    this.checksum = checksum;
    this.warning = warning;
  }
}
