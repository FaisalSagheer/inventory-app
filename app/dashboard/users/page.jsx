
import { Suspense } from "react";
import { users } from "../../../lib/mongodb";
import AddUser from "./AddUser";
import UserCard from "./UserCard";
import Loading from "../../../components/Loading";
import { NextResponse } from "next/server";

async function Users() {
    let user = []
    try {
        user = await users.find({}).project({password:0,__v:0,_id:0}).limit(20).toArray();
        // return NextResponse.json(user) 
    } catch (error) {
        return (
            <div className="flex justify-center items-center h-full">
                <h3 className="py-4">
                    Error Fetching Users
                </h3>
            </div>)

    }

    if (!user || user.length === 0) {
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
                <Suspense fallback={<Loading />}>
                    {
                        user.map((item,id) =>
                            <UserCard data={item} key={id} />
                        )
                    }
                </Suspense>
            </div>
        </>
    )
}

export default Users;
