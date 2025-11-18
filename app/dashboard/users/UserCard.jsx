'use client'
import React from 'react'
import { Button } from "../../../components/ui/button";

function UserCard({data,onDelete=()=>{},onEdit=()=>{}}) {
    const { name, role, id } = data
    if (role === 'admin')return null
        return (
            <div>
                    
                        <div className="mt-10 border-2 px-10">
                            <div className="text-center sm:py-8 flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-200 text-gray-400">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <div className="flex flex-col items-center text-center justify-center">
                                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{name}</h2>
                                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                                    <p className="text-base">{role}</p>
                                    {/* <p className="text-base">{_id}</p> */}
                                </div>
                                <div className='flex gap-4 pt-6 items-center'>
                                    <Button variant='destructive' onClick={()=>onDelete}>Delete</Button>
                                    <Button variant='edit'>Edit</Button>
                                </div>
                            </div>
                        </div>
                    
            </div>
        )
}

export default UserCard
