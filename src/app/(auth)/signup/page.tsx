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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, Mail, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { encryptData } from "@/lib/crypto";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const signUpSchema = z.object({
  email: z.string().email("Please enter valid email address"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:";'<>?,./|`~])[A-Za-z\d!@#$%^&*()_\-+={}[\]:";'<>?,./|`~]{8,}$/,
      "Please Enter Password  "
    ),
});

export default function Page() {
  const [error, setError] = useState<String | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMessages, setPasswordMessages] = useState<string[]>([]);
  const [passwordConditionsMet, setPasswordConditionsMet] = useState<boolean[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<any>(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post("/api/signup", values);

      if (response.data.success) {
        const encryptedEmail = encryptData(values.email);
        sessionStorage.setItem("verificationEmail", encryptedEmail);
        router.push("/verify");
        // router.push("/signin");
      }
      if (response.data.success === false) {
        setError(response.data.message);
      }
    } catch (error: any) {
      const errMsg = error as AxiosError<{ status: string; message: string }>;
      setError(errMsg?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const validatePassword = (password: string) => {
    const conditions = [
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[@$!%*?&]/.test(password),
      password.length >= 8,
    ];

    setPasswordConditionsMet(conditions);

    const messages = [
      "Password must include a capital letter",
      "Password must include a lowercase letter",
      "Password must include a number",
      "Password must include a special character",
      "Password must be at least 8 characters",
    ];

    if (conditions.every((condition) => condition)) {
      setPasswordMessages([]); // Clear messages if all conditions are met
    } else {
      setPasswordMessages(messages); // Set messages if conditions are not met
    }
  };

  return (
    <section className="h-screen flex items-center bg-white">
      <Card
        className="mx-auto max-w-sm 
shadow-[0_8px_30px_rgb(0,0,0,0.12)]
       text-black bg-[#fff]"
      >
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className="space-y-6"
            >
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          type="text"
                          placeholder="m@example.com"
                          {...field}
                          className={cn(
                            "transition-all duration-200 ease-in-out",
                            form.formState.errors.email &&
                              "border-red-500 focus-visible:ring-red-500 input-error"
                          )}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500  font-medium text-sm transition-all duration-200 ease-in-out" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            autoComplete="off"
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            {...field}
                            className={cn(
                              "transition-all duration-300 ease-in-out pr-10",
                              form.formState.errors.password &&
                                "border-red-500 focus-visible:ring-red-500 input-error"
                            )}
                            onBlur={(e) => {
                              validatePassword(e.target.value);
                              field.onBlur();
                            }}
                            onChange={(e) => {
                              validatePassword(e.target.value);
                              field.onChange(e);
                            }}
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
              </div>
              {passwordMessages.length > 0 && (
                <ul className="text-sm font-medium list-disc ml-5">
                  {passwordMessages.map((msg, index) => (
                    <li
                      key={index}
                      className={
                        passwordConditionsMet[index]
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {msg}
                    </li>
                  ))}
                </ul>
              )}
              {error && <p className="text-red-500 font-medium">{error}</p>}
              <div className="grid gap-2">
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-[#1c1c1c] text-white font-medium hover:bg-opacity-80"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" /> Loading
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" /> Sign Up
                    </>
                  )}
                </Button>
                {/*  <Button
                  variant="outline"
                  className=" font-medium bg-slate-200 hover:bg-opacity-50 "
                  onClick={() => signIn("google")}
                >
                  <Mail className="mr-2 h-4 w-4" /> Sign up with Google
                </Button> */}
              </div>
            </form>
          </Form>
          <Button
            variant="outline"
            className=" font-medium w-full mt-2 bg-slate-200 hover:bg-opacity-50 "
            onClick={async () => {
              setIsLoadingGoogle(true);
              const response = await signIn("google", { redirect: false });
              console.log("signin response", response);
            }}
          >
            {isLoadingGoogle ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Loading
              </>
            ) : (
              <>
                {/* <LogIn className="mr-2 h-4 w-4" /> Sign Up */}
                <Mail className="mr-2 h-4 w-4" /> Sign up with Google
              </>
            )}
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
