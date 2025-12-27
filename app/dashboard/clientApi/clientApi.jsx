'use client'
import { useEffect, useState } from "react";

export function ProductsLength() {
    const [DataLength, setDataLength] = useState(0)
    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const res = await fetch("/api/Products")
                if (!res.ok) {
                    console.log("Error Fetching Products")  
                }
                const products = await res.json()
                setDataLength(products.length)
                // setLoading(false)
                // console.log(data)
            }
            fetchProducts()
        } catch (err) {
            console.error("Failed to load data:", err);
            // setLoading(false);
        }
    }, []);
    return (
        <>
            {DataLength}
        </>
    )
};

export function UsersLength() {
    const [DataLength, setDataLength] = useState(0)
    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const res = await fetch("/api/Users")
                const users = await res.json()
                setDataLength(users.length)
                // setLoading(false)
                // console.log(data)
            }
            fetchProducts()
        } catch (err) {
            console.error("Failed to load data:", err);
            // setLoading(false);
        }
    }, []);
    // console.log(data.length)
    return (
        <>
            {DataLength}
        </>
    )
};