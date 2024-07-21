"use client";
import React, { useState } from "react";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Loader2Icon,Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Please enter email address"),
  password: z.string().min(1, "Please eneter password"),
});

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<any>(false)

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true)
      setError(null);

      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response?.error) {
        setError(response.error);
      } else if (response?.url) {
        router.push("/");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <section className="h-screen flex items-center bg-white">
      <Card className="mx-auto max-w-sm
shadow-[0_8px_30px_rgb(0,0,0,0.12)]
       
       text-black bg-[#fff]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="m@example.com"
                        {...field}
                        className={cn(
                          "transition-all duration-200 ease-in-out",
                          form.formState.errors.email && "border-red-500 focus-visible:ring-red-500 input-error"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 font-medium text-sm transition-all duration-200 ease-in-out" />
                  </FormItem>
                )}
              />
<<<<<<< HEAD
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
=======
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          {...field}
                          className={cn(
                            "transition-all duration-300 ease-in-out pr-10",
                            form.formState.errors.password && "border-red-500 focus-visible:ring-red-500 input-error"
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-opacity duration-300 ease-in-out"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye className="h-4 w-4 icon-fade" />
                          ) : (
                            <EyeOff className="h-4 w-4 icon-fade" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 font-medium text-sm transition-all duration-300 ease-in-out" />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500  font-medium transition-all duration-200 ease-in-out">{error}</p>}
              <div className="grid gap-2">
                <Button type="submit" variant="outline" className="bg-[#1c1c1c] text-white font-medium hover:bg-opacity-80">
                  {isLoading ? (<>
                    <Loader2Icon className="animate-spin mr-2" /> Loading
                  </>) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" /> Login
                    </>
                  )}
                </Button>
                <Button variant="outline" className= " font-medium bg-slate-200 hover:bg-opacity-50 "
                  onClick={() => signIn("google")}
>>>>>>> 0a397dccb148c74d6dada44fc8d5c99766d181b3
                >
                  {isLoadingGoogle ? (<>
                    <Loader2Icon className="animate-spin mr-2" /> Loading
                  </>) : (
                    <>
                        <Mail className="mr-2 h-4 w-4" />   Login with Google
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}