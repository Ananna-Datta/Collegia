import { authOptions } from "@/auth";
import NextAuth from "next-auth";
// import { authOptions } from "@/../../auth";
// import { authOptions } from "@/auth"; // path to your auth.js

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
