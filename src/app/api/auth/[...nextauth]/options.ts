import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import connectToDB from "@/lib/dbConnect";
// import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  providers: [
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
        // await connectToDB();
        try {
          //TODO: check here code if you are getting error while login
          console.log({ credentials });
          /*  const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.email },
            ],
          }); */
          /*  if (!user) {
            throw new Error("User not found");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your account before logging.");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          } */
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
      /*  if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.isAcceptingMessage = user.isAcceptingMessage;
        token.username = user.username;
      } */
      return token;
    },
    async session({ session, token }) {
      /*  if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessage;
        session.user.username = token.username;
      } */
      return session;
    },
  },
};

export default authOptions;
