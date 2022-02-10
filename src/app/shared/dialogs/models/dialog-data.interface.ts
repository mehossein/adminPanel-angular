import { User } from './../../../models/User';
export interface DialogData {
  userdata: any;
  message: string;
  submit: string;
  cancel: string;
  submitFn?: (data?: User) => User;
  cancelFn?: () => void;
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
