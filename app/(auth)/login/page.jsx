"use client"

import AuthForm from "../AuthForm";
import { useState } from "react";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {

  const [error, setError] = useState('')
  const router = useRouter()

  const callbackUrl = (router.query?.callbackUrl) ?? "/keystatic"

  const handleSubmit = async (e, email, password) => {
    e.preventDefault()
    setError('')

    const res = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false
    })

    if (res?.error) {
        setError(res.error)
    } else {
      console.log(res)
        router.push(callbackUrl)
    }
    
  }

  return (
    <main>
        <h2 className="text-center">Login</h2>
        <AuthForm handleSubmit={handleSubmit}/>

        { error && (
          <div className="error">{error}</div>
        )}
    </main>
  )
}
