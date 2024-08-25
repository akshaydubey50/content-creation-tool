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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaLinkedin } from "react-icons/fa6";
import { RiTwitterFill } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import NewsLetter from "@/components/newsletter";
import { Select,SelectItem,SelectTrigger,SelectValue,SelectContent } from "@/components/ui/select";
import { MapPin,Mail,Phone } from 'lucide-react';

const loginSchema = z.object({
    name: z.string().min(1, "First name is required"),
    email: z.string().email("Invalid email address"),
    description: z.string().min(5, "Describe your message"),
    country: z.string().min(1, "Country selection is required"),
});


export default function ContactUs() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            name: "",
            description: "",
            country:""

        },
    });

    const onSubmit = (values: any) => {
        console.log(values)
    }

    const messages = [
        { value: 'advertising_sponsorship', label: 'Advertising / Sponsorship' },
        { value: 'affiliate_patnership', label: 'Affiliate / Patnership' },
        { value: 'bug_issue', label: 'Bug / Issue' },
        { value: 'careers', label: 'Careers' },
        { value: 'feedback', label: 'Feedback' },
        { value: 'media_pr', label: 'Media / PR' },
        { value: 'other', label: 'Other' },

    ];
    return (
        <>
            <div className="flex flex-col items-center space-y-4  pt-24 pb:4  lg:pb-8">
                <h1 className='font-semibold text-2xl  xl:text-4xl '>Contact </h1>
                <p>
                    We&apos;re here to help!
                </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-10 mx-auto max-w-7xl mt-6 lg:mt-10 lg:px-6 place-content-baseline">
            <section className=' px-8 '>
                <div className="flex flex-col space-y-4 ">
                        <p className="text-xl font-semibold"> Get in Touch with the CCF Team</p>
                        
                        <p>
                            Got a question, feedback, or just want to say hello? We&apos;re all ears!

                            </p>
                            <p>
                            Drop us a message, and we&apos;ll get back to you as quickly as possible.
                            </p>
                            <p>
                            Your insights help us shape a better experience for the community..
                            </p>
                        <p>Don&apos;t hesitate—get in touch!
                        </p>
                      
                        
                        <p className="flex  items-center gap-2">
                            <span>
                                <Mail className="w-4 h-4" />
                            </span>
                            <span>

                            contentcreation.fyi@gmail.com
                            </span>
                            </p>

                        <p className="flex  items-center gap-2">
                            <span >
                                <MapPin className="w-4 h-4" />
                            </span>
                            <span>
                                Mumbai, India
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="cursor-pointer">
                                <FaLinkedin className="text-3xl" />

                            </span>
                            <span className="cursor-pointer">
                                <RiTwitterFill className="text-3xl" />

                            </span>
                        </p>
                       
                </div>
            </section>
                <section className=" px-4 lg:px-0 ">

                    <Card className=" py-6 ">
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    {...field}
                                                    className={cn( 
                                                        "border-gray-500",
                                                        "transition-all duration-200 ease-in-out",
                                                        form.formState.errors.name &&
                                                        "border-red-500 focus-visible:ring-red-500 input-error"
                                                    )}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 font-medium text-sm transition-all duration-200 ease-in-out" />
                                        </FormItem>
                                    )}
                                />
                               

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Email"
                                                {...field}
                                                className={cn(
                                                    "border-gray-500",
                                                    "transition-all duration-200 ease-in-out",
                                                    form.formState.errors.email &&
                                                    "border-red-500 focus-visible:ring-red-500 input-error"
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 font-medium text-sm transition-all duration-200 ease-in-out" />
                                    </FormItem>
                                )}
                            />

                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger className="border-gray-500">
                                                            <SelectValue placeholder="Reason for contacting" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-gray-100 cursor-pointer">
                                                            {messages.map((country) => (
                                                                <SelectItem key={country.value} value={country.value} className="hover:bg-orange-200 cursor-pointer">
                                                                    {country.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className="text-red-500 font-medium text-sm transition-all duration-200 ease-in-out" />
                                            </FormItem>
                                        )}
                                    />


                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Message"
                                                {...field}
                                                className={cn(
                                                    "border-gray-500",
                                                    "transition-all duration-200 ease-in-out",
                                                    form.formState.errors.description &&
                                                    "border-red-500 focus-visible:ring-red-500 input-error"
                                                )}
                                            />
                                        </FormControl>


                                        <FormMessage className="text-red-500 font-medium text-sm transition-all duration-300 ease-in-out" />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-start">
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className=" text-white font-medium border w-full border-black bg-black hover:bg-white hover:text-black"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
                </section>

            </div>
            <NewsLetter />

        </>
    )
}