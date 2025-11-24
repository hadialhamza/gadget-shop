import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/utils/mongodb";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // ১. ডাটাবেস কানেকশন
        const client = await clientPromise;
        const db = client.db("gadget-shop");

        // ২. ইউজার খোঁজা
        const user = await db.collection("users").findOne({ email });

        if (!user) {
          throw new Error("No user found");
        }

        // ৩. সরাসরি পাসওয়ার্ড চেক (Plain Text)
        // ইউজার যে পাসওয়ার্ড দিয়েছে === ডাটাবেসের পাসওয়ার্ড
        if (password !== user.password) {
          throw new Error("Password mismatch");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user._id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
