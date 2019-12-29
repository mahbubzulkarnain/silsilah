import { IServiceAPI } from "./IDataSources";

export interface IContext {
  req?: any;
  res?: any;
  DEV?: boolean;
  token?: string;
  user?: any;
  dataSources?: IServiceAPI;
}
