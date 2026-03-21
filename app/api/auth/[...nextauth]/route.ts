import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Any user can log in with any password for this demo.
        if (credentials?.email && credentials?.password) {
          return { id: "1", name: credentials.email.split('@')[0], email: credentials.email };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: "ai-resume-builder-secret-key-12345", // Fallback secret
});

export { handler as GET, handler as POST };
