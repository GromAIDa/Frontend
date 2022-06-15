export type ToastType = 'success' | 'error' | 'info';

export interface IToastConfig {
  message: string;
  buttonText: string | undefined;
  type: ToastType;
}
