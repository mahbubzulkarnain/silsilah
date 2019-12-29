import {Couple} from "../Couples/interface";
import {Children} from "../Children/interface";

export interface People {
  id: string;
  address?: string;
  blood_type?: string;
  date_of_birth?: string;
  date_of_death?: string;
  email?: string;
  gender?: string;
  nick_name?: string;
  phone?: string;
  profile_picture?: string;
  sure_name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PeopleWithCouples extends People {
  couples: [Couple] | []
}

export interface Parent {
  husband?: People
  wife?: People
  children?: [Children] | []
}
