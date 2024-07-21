import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import connectToDB from "@/lib/dbConnect";
// import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/dbConnect";
import UserModel from "@/models/user/User.model";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
  }),
    CredentialsProvider({
      id: "credentials",
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDB();
        try {
          //TODO: check here code if you are getting error while login
          console.log({ credentials });
          const user = await UserModel.findOne({
            $or: [{ email: credentials.email }],
          });
          if (!user) {
            throw new Error("User not found");
          }
          /* if (!user.isVerified) {
            throw new Error("Please verify your account before logging.");
          } */
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (e: any) {
          console.log("Error while creating credentials", e.message);
          throw new Error(e);
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.email = user.email;
        /*    token.isAcceptingMessage = user.isAcceptingMessage;
        token.username = user.username; */
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.email = token.email;
        /* session.user.isAcceptingMessages = token.isAcceptingMessage;
        session.user.username = token.username; */
      }
      return session;
    },
  },
};

export default authOptions;
