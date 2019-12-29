export interface IPageInfo {
  nextCursor: string | null;
  prevCursor: string | null;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IResponse {
  edges: any;
  message: string;
  pageInfo: IPageInfo;
  totalCount?: number;
}
