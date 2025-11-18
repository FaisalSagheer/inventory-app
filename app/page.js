
import Link from 'next/link'

import React from 'react'
import { getServerSession } from 'next-auth'
import { options } from './(Backened)/api/auth/[...nextauth]/options'
import { Button } from '../components/ui/button'

const page = async () => {
  const session = await getServerSession(options)
  return (
    <div>

      <div className='flex justify-center items-center h-screen'>
        {/* <Dashboard/> */}
        {
          session ?? <Button>
            <Link href='/api/auth/signin?callbackUrl=/dashboard'>Login</Link>
          </Button>
        }
      </div>
    </div>
  )
}

export default page

