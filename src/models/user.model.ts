import {BaseModel} from './base.model';

export type UserModel = BaseModel & {
  name: string;
  email: string;
  phone: string;
};
