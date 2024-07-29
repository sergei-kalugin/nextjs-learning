import NextAuth from "next-auth";
import {authConfig} from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";
import {sql} from "drizzle-orm";
import {db} from "@/app/db/db";
import bcrypt from "bcrypt";
import {User} from "@/app/lib/definitions";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await db.execute(sql`
      SELECT * FROM users
      WHERE email=${email}
    `);

    return user?.rows[0] || null;
  } catch (error) {
    console.log('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const {
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
      Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
              .object({
                email: z.string().email(),
                password: z.string().min(6),
              })
              .safeParse(credentials);

          if (parsedCredentials.success) {
            const {
              email,
              password
            } = parsedCredentials.data;

            const user = await getUser(email);

            if (!user) return null;

            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (passwordsMatch) return user;
          }

          console.log('Invalid credentials!');
          return null;
        },
      })
  ]
});