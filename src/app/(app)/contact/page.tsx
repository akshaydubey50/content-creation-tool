import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ContactUs() {
    const FormSchema = z.object({
        email: z
            .string({
                required_error: "Please select an email to display.",
            })
            .email(),
    })
    function onSubmit(values: z.infer<typeof FormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    })
    return (
        <>


            <section className='max-w-7xl w-full mx-auto mt-10 px-8 '>
                <h1 className='font-semibold text-2xl xl:text-3xl pt-2 pb-6 lg:pb-8 xl:pb-12'>Contact Us</h1>
                <div className="flex flex-col space-y-4 ">

                    <p>
                        Were a collective of entrepreneurs and creators with global perspectives who believe in AI for good. We believe in a future where AI enhances every professionals toolkit.

                    </p>
                    <p>
                        Our team delves deep into AI tools and apps with transformative potential to then produce high quality editorial content for the world to absorb.

                    </p>
                    <p>
                        Tailored for the proactive modern professional, we provide comprehensive resources that illuminate the path to AI integration in the workplace. Create a free account and elevate your professional journey with us today.
                    </p>
                    <p>
                        Have questions or just want to chat with our team? Feel free to fill out the form below and someone will respond ASAP.
                    </p>
                </div>
            </section>

            <Card className="w-full max-w-7xl mx-auto mt-5 mb-10 px-4 border-0 ">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">We’d Love to Hear From You!</CardTitle>
                    <CardDescription>Fill out the form below and well get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormLabel>Last  Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" type="email" {...field} />
                                        </FormControl>
                                        <FormLabel>Country</FormLabel>

                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a verified email to display" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            You can manage email addresses in your{" "}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                    {/* <form className="grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" placeholder="Enter your first name" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" placeholder="Enter your last name" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Tell us how we can help you" className="min-h-[100px]" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="country">Country</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectItem value="us">United States</SelectItem>
                                    <SelectItem value="ca">Canada</SelectItem>
                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                    <SelectItem value="au">Australia</SelectItem>
                                    <SelectItem value="de">Germany</SelectItem>
                                    <SelectItem value="fr">France</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </form> */}
                </CardContent>
                <CardFooter className="flex justify-start">
                    <Button type="submit" variant={"default"} className='bg-black text-white  border border-black  hover:bg-gray-100 hover:text-black'>Submit</Button>
                </CardFooter>
            </Card>
        </>
    )
}
