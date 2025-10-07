export type User = {
  id: number;
  email: string;
  username: string;
  fullname: string;
  user_image: string;
  address: string;
  phone: string;
  password_hash: string;
  reset_hash: string | null;
  reset_at: string | null;
  reset_expires: string | null;
  activate_hash: string | null;
  status: string | null;
  status_message: string | null;
  active: number;
  force_pass_reset: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type AuthGroupUser = {
  group_id: number;
  user_id: number;
  user: User;
};

export type CheckSUserResponse = { available: boolean };
