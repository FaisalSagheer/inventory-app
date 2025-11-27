'use client'
import { ChevronDownIcon, Plus } from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

function AddProducts() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    quantity: "",
    amount: "",
    category: "",
    status: ""
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const res = await fetch("/api/Products", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: { "Content-type": "application/json" },
    });
    console.log(formData)
    if (!res.ok) {
      const response = await res.json();
      // setErrorMsg(response.message);  
      toast(response.message)
    }
    else {
      router.refresh()
      router.push('/dashboard/inventory')
    }

  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Products
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            Add a New Product
          </DialogTitle>
          <form onSubmit={handleSubmit} method="post" className="space-y-6">

            <div>
              <label className="block text-sm/6 font-medium text-black">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  required={true}
                  value={formData.name}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black/40 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-black">
                Weight
              </label>
              <div className="mt-2">
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  onChange={handleChange}
                  required={true}
                  value={formData.weight}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black/40 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-black">
                Quantity
              </label>
              <div className="mt-2">
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  onChange={handleChange}
                  required={true}
                  value={formData.quantity}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black/40 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-black">
                Amount
              </label>
              <div className="mt-2">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  onChange={handleChange}
                  required={true}
                  value={formData.amount}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black/40 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Category
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="category"
                  name="category"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-black/30 focus:outline-2 focus:-outline-offset-2 focus:outline-black/40 sm:text-sm/6"
                  onChange={handleChange}
                  value={formData.category}
                  required={true}
                >
                  <option value="" disabled hidden>Select a Category</option>
                  <option value="grocery">Grocery</option>
                  <option value="cloth">Cloth</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="status"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Status
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="status"
                  name="status"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-black/30 focus:outline-2 focus:-outline-offset-2 focus:outline-black/40 sm:text-sm/6"
                  onChange={handleChange}
                  value={formData.status}
                  required={true}
                >
                  <option value="" disabled hidden>Select a status</option>
                  <option value="success">Success</option>
                  <option value="pending">Pending</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>


            <div className="flex justify-end">
              <Button type="submit" value="Add Product">Add Product</Button>
            </div>
          </form>
        </DialogContent>

        <Toaster />
      </Dialog>


    </>
  )
}

export default AddProducts
