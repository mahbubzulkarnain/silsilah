import { Couple } from "../Couples/interface";
import { Children } from "../Children/interface";

export enum ParentKey {
  husband = "husband",
  wife    = "wife"
}

export interface People {
  item: Couple[];
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
  couples: [Couple]
  parent?: Parent
  children?: [Children]
}

export interface Parent {
  husband?: People
  wife?: People
  children?: [Children] | []
}
