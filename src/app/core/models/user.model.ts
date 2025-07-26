// src/app/core/models/user.model.ts
export interface User {
  id: string;
  username: string;
  email: string;
  role?: string;
  token?: string;
}
