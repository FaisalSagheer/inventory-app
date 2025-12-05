'use client'
import { useEffect, useState } from "react";

const ProductsLength = () => {

    const [Data, setData] = useState([])
    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const res = await fetch("/api/Products")
                const jsonr = await res.json()
                setData(jsonr.product)
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
            {Data.length}
        </>
    )
}

const UsersLength = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const res = await fetch("/api/Users")
                const jsonr = await res.json()
                setData(jsonr.user)
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
            {data.length}
        </>
    )
}
export { UsersLength, ProductsLength }
