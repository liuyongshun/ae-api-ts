import { expression } from "@hapi/joi";

export interface User {
  userName: string,
  password: string,
};

export interface RUser extends User {
  againPassword?: string,
  mobile?: string
}

export type Error = {
  [key in string | number]: any;
};
