import NewsLetter from '../newsletter/index';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";


const Details =({content}:any)=>{
    const formSchema = z.object({
        email: z.string().email("Please enter email address"),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });
    const onSubmit =()=>{

    }
    return(
        <>
            <div className=" grid grid-cols-1 lg:grid-cols-12  gap-8 lg:gap-20  my-2 lg:my-8">
                <div className="col-span-1 lg:col-span-8 rounded-lg markdown-content">
               <ReactMarkdown>{content}</ReactMarkdown>
            </div>

                <div className="col-span-1 lg:col-span-4 rounded-lg ">
                {/* subscribe newsletter  */}
                    <Card className='bg-gray-100'>
                        <CardHeader>
                            <CardTitle>Subscribe to Newsletter</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        autoComplete="off"
                                                        placeholder="m@example.com"
                                                        {...field}
                                                        className={cn(
                                                            "transition-all duration-200 ease-in-out",
                                                            form.formState.errors.email &&
                                                            "border-red-500 focus-visible:ring-red-500 input-error"
                                                        )}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full border text-black border-black hover:border-white hover:text-white hover:bg-black" variant="outline">Submit</Button>
                                </form>
                            </Form>

                        </CardContent>
                       
                    </Card>
            </div>
        </div>
      
        </>
    )
}
export default Details