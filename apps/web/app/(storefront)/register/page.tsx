'use client';

import { useActionState } from 'react';
import { register } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function RegisterPage() {
    const [errorMessage, formAction, isPending] = useActionState(
        register,
        undefined,
    );

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">RM ERP System</h3>
                    <p className="text-sm text-gray-500">
                        Create an account to access the dashboard.
                    </p>
                </div>
                <form action={formAction} className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength={6}
                            className="mt-1"
                        />
                    </div>
                    <Button disabled={isPending} className="mt-4 w-full" type="submit">
                        {isPending ? 'Creating account...' : 'Register'}
                    </Button>

                    <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                        {errorMessage && (
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        )}
                    </div>

                    <div className="mt-2 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
