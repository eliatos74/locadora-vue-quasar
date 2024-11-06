export interface RecoverPassword {
  newPassword: string;
  repeatPassword: string;
  email: string;
  otpCode: number | null;
}
