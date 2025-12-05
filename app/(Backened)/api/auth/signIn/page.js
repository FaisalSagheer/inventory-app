"use client";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "../../../../../components/ui/sonner";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const [userData, setUserData] = useState({ name: "", password: "" });
  const handlesignIn = async (e) => {
    e.preventDefault();
    try {
      if (!userData.name && !userData.password) {
        toast('Name & Password Required')
        return;
      }
      if (!userData.name) {
        toast("Name Required");
        return;
      }
      if (!userData.password) {
        toast("Password Required");
        return;
      }
      else {
        await signIn('credentials',
          // 'password', { redirect: false, password: !userData.password },
          {
            name: userData.name,
            password: userData.password,
            redirect: true,
            callbackUrl: '/dashboard',
            // error:'/api/auth/error'
          },
        )

      }
    } catch (error) {
      toast('Login Error', error)
    }
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Toaster />
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          {/* <CardDescription>
            Enter your email below to login to your account
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="FullName"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" onClick={handlesignIn}>
                  Sign In
                </Button>
              </div>
            </div>
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>

  );
}
