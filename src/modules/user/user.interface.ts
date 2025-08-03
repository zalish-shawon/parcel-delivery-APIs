export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'sender' | 'receiver';
  isBlocked?: boolean;
}
