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
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<String | null>(null);
  const [msg, setMessage] = useState<String | null>(null);
  const route = useRouter();

  const handleForgetPassword = async () => {
    try {
      setError(null);
      setMessage(null); // Clear previous messages

      const response = await axios.post("/api/forgot-password", {
        email: email,
      });

      // Set success message
      setMessage("Reset Password link sent to your email!!");
    } catch (error) {
      const errorMsg = error as AxiosError<{ status: string; message: string }>;
      setError(errorMsg?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <Card className="mx-auto max-w-sm shadow-lg bg-white rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Forget Password</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Enter your email to reset your password
          </CardDescription>
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
                disabled={!!msg}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {msg && <div className="text-green-500">{msg}</div>}
            <Button
              variant="outline"
              onClick={handleForgetPassword}
              type="button" // Change type to "button" to prevent form submission
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
