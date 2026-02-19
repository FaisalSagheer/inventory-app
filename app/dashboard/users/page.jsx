'use client'
import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import UserCard from "./UserCard";
import Loading from "../../../components/Loading";
import { toast } from "sonner";

const Users = () => {
    const [Data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/Users')
                if (!response.ok) {
                    toast.error(response.message || "Error Fetching Users")
                }
                const users = await response.json()
                setData(users)
                setLoading(false)
            }
            catch (error) {
                toast.error("No Internet")
            }
        }
        fetchUsers()
    }, [])
    if (loading) {
        return (
            <>
                <Loading />
            </>
        )
    }
    if (!Data || Data.length === 0) {
        return (
            <div className="flex justify-center flex-col items-center h-full">
                <h3 className="py-4">
                    Add Some Users...
                </h3>
                <AddUser />
            </div>)

    }
    return (
        <>
            <div className="flex justify-end m-4">
                <AddUser />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 mx-4 gap-4">
                {
                    Data.map((userData) => {
                        return (
                            <UserCard userData={userData} setData={setData} key={userData._id} />
                        )
                    }
                    )
                }
            </div>
        </>
    )
}

export default Users;
