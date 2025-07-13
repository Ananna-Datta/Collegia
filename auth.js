import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
// import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import { dbConnect } from "./src/lib/dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect directly to "users" collection by string name
        const userCollection = await dbConnect("users");
        const user = await userCollection.findOne({ email: credentials.email });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image || null,
          role: user.role || "user",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const userCollection = await dbConnect("users");
        const existingUser = await userCollection.findOne({ email: user.email });
        if (!existingUser) {
          await userCollection.insertOne({
            name: user.name || "",
            email: user.email,
            image: user.image || null,
            provider: account.provider,
            role: "user",
            createdAt: new Date(),
          });
        }
      }
      return true;
    },

    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
