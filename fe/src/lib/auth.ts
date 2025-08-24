// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { UserStore } from "@/validation/authSchema";
import { axiosServer } from "./axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text " },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await axiosServer.post(`/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.data && response.data.user) {
            return {
              id: response.data.user.id.toString(),
              email: response.data.user.email,
              name: response.data.user.name,
              role: response.data.user.role,
              username: response.data.user.username,
              phone: response.data.user.phone,
              address: response.data.user.address,
              store: response.data.user.store,
              accessToken: response.data.token,
            };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Use the ID token from Google
          const response = await axiosServer.post(`/login`, {
            credential: account.id_token,
          });

          if (response.data && response.data.user) {
            // Add backend user data to the user object
            user.id = response.data.user.id.toString();
            user.role = response.data.user.role;
            user.username = response.data.user.username;
            user.phone = response.data.user.phone;
            user.address = response.data.user.address;
            user.store = response.data.user.store;
            user.accessToken = response.data.token;
            return true;
          }
          return false;
        } catch (error) {
          console.error("Google login error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
        token.phone = user.phone;
        token.address = user.address;
        token.store = user.store;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
        session.user.username = token.username as string;
        session.user.phone = token.phone as string;
        session.user.address = token.address as string;
        session.user.store = Array.isArray(token.store)
          ? token.store
          : token.store
          ? [token.store as UserStore]
          : [];
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  // pages: {
  //   signIn: "/login",
  //   signOut: "/login",
  // },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
