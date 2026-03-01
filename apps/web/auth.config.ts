import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            // Define protected routes that require authentication
            const protectedRoutes = ['/inventory', '/organizations', '/employees', '/customers', '/settings', '/dashboard'];
            const isProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route));

            const isAuthRoute = nextUrl.pathname === '/login' || nextUrl.pathname === '/register';

            if (isProtectedRoute) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isAuthRoute && isLoggedIn) {
                return Response.redirect(new URL('/inventory', nextUrl));
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                // @ts-ignore
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                // @ts-ignore
                session.user.role = token.role as string;
            }
            return session;
        }
    },
    providers: [], // Add providers with an empty array for now
};
