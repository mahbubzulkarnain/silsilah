import { IInput } from '../_base/interface';

export interface IPeople {
  id: string;

  address: string;
  blood_type: string;
  date_of_birth: string;
  date_of_death: string;
  email: string;
  gender: string;
  nick_name: string;
  phone: string;
  profile_picture: string;
  sure_name: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IPeopleInput extends IInput {
  id?: string;
  ids?: string[];
}
