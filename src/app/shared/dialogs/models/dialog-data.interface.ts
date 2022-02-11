import { User } from './../../../models/User';
export interface DialogData {
  userdata: User;
  submit: string;
  cancel: string;
  message: string;
  cancelFn?: () => void;
  submitFn?: (data?: User) => User;
  deleteUserFn?: (id: number) => void;
}

export interface City {
  id: number;
  name: string;
}

export interface state {
  id: number;
  name: string;
  slug: string;
  province_id: number;
}
