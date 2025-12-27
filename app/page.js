'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

// const push = window.location.href('/dashboard')

const page = () => {
  const { data: session } = useSession()
  return (
    <div>

      <div className='flex justify-center items-center h-screen'>
        {
          session?.user ? redirect('/dashboard') : (
          // <Button onClick={() => signIn()}>
          //   <Link href='/api/auth/signin?callbackUrl=/dashboard'>Login</Link>
          //   SignIn
          // </Button>
        redirect('/api/auth/signIn')  
        )

        }
      </div>
    </div>
  )
}

export default page

