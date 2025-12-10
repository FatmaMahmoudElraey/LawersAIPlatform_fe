export interface IErrorResponse {
  statusCode: number;
  message: any;
  errorName: string;
  timestamp: string; // ISO String !!
  path: string;
}

export interface IGetSuccessResponse<T> {
  data: T[];
  meta: IMetaData;
}

interface IMetaData {
  count: number;
  page: number;
}
