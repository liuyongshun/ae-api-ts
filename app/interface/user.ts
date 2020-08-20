export interface User {
  userName: string,
  password: string,
  againPassword: string,
  mobile: string
};

export interface Error {
  [key: string : number]: any
}
