export class DatasetDto {
  url: string;
  updatedAt: string;
  checksum: string;
  warning: string;
  urlData: object;
  
  constructor(datasetData: {
    url: string;
    updatedAt: string;
    checksum: string;
    warning: string;
    urlData: object;
  }) {
    this.url = datasetData.url;
    this.updatedAt = datasetData.updatedAt;
    this.checksum = datasetData.checksum;
    this.warning = datasetData.warning;
    this.urlData = datasetData.urlData;
  }
}
