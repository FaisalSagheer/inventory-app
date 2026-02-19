'use client'

import { useParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

function Account() {
  const { id } = useParams()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/Users/${id}`)
        if (!res.ok) {
          toast.error(res.message)
        }
        const users = await res.json()
        console.log(users)
        console.log(res)
      } catch (error) {
        toast.error(error)
      }
    }
    fetchUser
  }, [id])
  return (
    <div className="py-3 px-5">
      <h2 className="text-2xl font-semibold">
        Account
      </h2>
      <div>
      </div>
    </div>
  )
}

export default Account