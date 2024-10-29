export interface UserList {
  id: number;
  name: string;
  role: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string;
}
