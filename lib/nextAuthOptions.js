// lib/nextauthOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { encode, decode } from 'next-auth/jwt';

import clientPromise from "./mongodb";

import { connectToDatabase } from "./mongodb";

export const nextauthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        let { db } = await connectToDatabase();
        const usersCollection = db
          .collection("users");
        const email = credentials?.email.toLowerCase();
        const user = await usersCollection.findOne({ email });
        if (!user) {
          throw new Error("User does not exist.");
        }

        //validate password
        const passwordIsValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordIsValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          ...user,
        };
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  // jwt: { encode, decode },
  pages: {
    signIn: '/login',
    error: '/login'
  }
};
