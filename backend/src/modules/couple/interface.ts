import { IInput } from '../_base/interface';

export interface ICouple {
  id: string;

  husband_id: string;
  wife_id: string;

  date_of_marriage: string;
  date_of_divorce: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ICoupleInput extends IInput {
  id?: string;
  ids?: string;
  husband_id?: string;
  wife_id?: string;
}
