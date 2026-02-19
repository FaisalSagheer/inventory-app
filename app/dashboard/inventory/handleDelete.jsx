'use client'
import { toast } from 'sonner'

export const HandleDelete = async (e, id) => {
    e.preventDefault()
    const res = await fetch(`/api/Products/${id}`, {
        method: 'DELETE'
    })
    // setData(prev => prev.filter(Product => Product._id !== id))
    const response = await res.json()
    if (res.ok) {
        return toast.success(response.message)
    } else {
        return toast.error(response.message)
    }

}