import React from 'react'
import { toast } from 'sonner'

export const HandleDelete = async (e, id) => {
    e.preventDefault()
    const res = await fetch(`/api/Products/${id}`, {
        method: 'DELETE'
    })
    // setData(prev => prev.filter(Product => Product._id !== id))
    if (res.ok) {
        return toast.success(res.message)
    } else {
        return toast.error(res.message)
    }

}