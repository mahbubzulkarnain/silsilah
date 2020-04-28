import { IInput } from '../_base/interface';


export interface IChildren {
  parent_id: string;
  child_id: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IChildrenInput extends IInput {
  id?: string;
  child_id?: string;
  parent_id?: string;
}
