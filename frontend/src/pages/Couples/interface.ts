import {People, PeopleWithCouples} from "../Peoples/interface";

export interface Couple extends People {
  husband?: People
  wife?: People
  children?: [{ child: PeopleWithCouples }]
}
