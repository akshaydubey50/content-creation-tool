"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { SignInResponse, signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserAuth } from "@/redux/slice/user/userSlice";

export default function Page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<String | null>(null);
  const [msg, setMessage] = useState<String | null>(null);
  const route = useRouter();
  const dispatch = useDispatch();

  const handleForgetPassword = async () => {
    try {
      setError(null);

      const response = await axios.post("/api/forgot-password", {
        email: email,
      });
      console.log("forget password:", { response });
    } catch (error) {
      const errorMsg = error as AxiosError<{ status: string; message: string }>;
      setError(errorMsg?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="h-screen flex items-center  ">
      <Card className="mx-auto max-w-sm shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]	">
        <CardHeader>
          <CardTitle className="text-2xl">Forget Password</CardTitle>
          <CardDescription>Enter your email to reset password</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {msg && <div className="text-green-500">{error}</div>}
            <Button
              variant="outline"
              onClick={handleForgetPassword}
              type="submit"
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
