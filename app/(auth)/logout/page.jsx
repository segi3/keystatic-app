"use client"

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default async function Logout() {

    const router = useRouter()

    signOut({ redirect: false }).then(() => {
        router.push("/"); // Redirect to the dashboard page after signing out
      });

    return (
        <div>Logout</div>
    )
}
