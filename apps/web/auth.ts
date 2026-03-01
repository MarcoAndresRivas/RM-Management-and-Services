// @ts-nocheck
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from '@repo/db';
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from '@auth/prisma-adapter';

// @ts-ignore: TS2742 NextAuth inferred types are not portable in pnpm
const nextAuthResult = NextAuth({
    adapter: PrismaAdapter(prisma),
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    const user = await prisma.user.findUnique({ where: { email } });
                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    }
});

export const auth: any = nextAuthResult.auth;
export const signIn: any = nextAuthResult.signIn;
export const signOut: any = nextAuthResult.signOut;
export const handlers: any = nextAuthResult.handlers;
export const GET: any = nextAuthResult.handlers.GET;
export const POST: any = nextAuthResult.handlers.POST;
