export interface User {
  username: string;
  birthday: number;
  gender: GenderType;
  password: string;
  activity: boolean;
  province: string;
  city: string;
}

export enum GenderType {
  MALE = 1,
  FEMALE = 2,
}
