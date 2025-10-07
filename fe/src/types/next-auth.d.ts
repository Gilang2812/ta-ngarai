/* eslint-disable @typescript-eslint/no-unused-vars */
// src/types/next-auth.d.ts
import { UserStore } from "@/validation/authSchema";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      username?: string;
      phone?: string;
      address?: string;
      store?: UserStore[];
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    role?: string;
    username?: string;
    phone?: string;
    address?: string;
    store?: UserStore;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    username?: string;
    phone?: string;
    address?: string;
    store?: UserStore;
    accessToken?: string;
  }
}
