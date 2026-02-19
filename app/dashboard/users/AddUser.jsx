"use client";

import { ChevronDownIcon, Plus } from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim() || !formData.role.trim() || !formData.phone.trim()) {
      return toast.error("All fields are required!")
    }
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({formData}),
      headers: { "Content-Type": "application/json" },
    })

    const response = await res.json()
    if (res.ok) {
      location.reload()
      return toast.success(response.message || "User Created!")
    } else {
      return toast.error(response.message || "Error Creating User")
    }
  };

  const handlePhone = (e) => {
    const { value } = e.target;
    if (/^[\d\s\-\+\(\)]*$/.test(value)) {
      setFormData
        ((prev) => ({
          ...prev,
          phone: value
        }))

    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            Add a New User
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

                  value={formData.name}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black/40 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-black">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={11}
                  onChange={handlePhone}
                  value={formData.phone}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black/40 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-black">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  onChange={handleChange}

                  value={formData.email}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black/40 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-black">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}

                  value={formData.password}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black/40 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="role"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Role
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="role"
                  name="role"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-black/30 focus:outline-2 focus:-outline-offset-2 focus:outline-black/40 sm:text-sm/6"
                  onChange={handleChange}
                  value={formData.role}

                >
                  <option value="" disabled hidden>Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" value="Create User">Create User</Button>
            </div>
          </form>
        </DialogContent>

      </Dialog>

    </>
  );
};

export default AddUser;
