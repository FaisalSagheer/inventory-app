'use client'
import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import UserCard from "./UserCard";
import Loading from "../../../components/Loading";
import { useRouter } from "next/navigation";

function Users() {
    const [Data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        try {
            const fetchUsers = async () => {
                const response = await fetch('/api/Users')
                if (!response.ok) {
                    console.log('Error in response')
                }
                const res = await response.json()
                setData(res.user)
                // console.log(res.user)
                setLoading(false)
            }
            setTimeout(() => {
                router.refresh()
                fetchUsers()
            }
                , 2000);
        } catch (error) {
            return (
                <div className="flex justify-center items-center h-full">
                    <h3 className="py-4">
                        Error Fetching Users
                    </h3>
                </div>)
        }
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
                    Data.map((user, index) => {
                        return (
                            <div key={index}>
                                <UserCard data={user} />
                            </div>)
                    }
                    )
                }
            </div>
        </>
    )
}

export default Users;
