export interface DialogData {
  userData: any;
  message: string;
  submit: string;
  cancel: string;
  submitFn?: () => void;
  cancelFn?: () => void;
}
