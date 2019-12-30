import {People} from "../Peoples/interface";
import {Children} from "../Children/interface";

export interface Couple extends People {
  husband?: People
  wife?: People
  children?: [Children]
}
