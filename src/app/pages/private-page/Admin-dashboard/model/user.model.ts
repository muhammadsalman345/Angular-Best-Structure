export interface User {
    id: number;           // Unique identifier for the user
    username: string;     // Username of the user
    email: string;        // Email address
    status: boolean;      // Active (true) or Inactive (false)
    role: 'admin' | 'user'; // Role of the user
    createdAt?: Date;     // (Optional) Account creation date
    updatedAt?: Date;     // (Optional) Last update date
  }
  