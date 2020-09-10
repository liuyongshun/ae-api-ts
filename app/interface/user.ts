export interface User {
  userName: string,
  password: string,
  againPassword: string,
  mobile: string
};

export type Error = {
  [key in string | number]: any;
};
