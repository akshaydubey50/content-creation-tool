import Image from 'next/image'
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function NewsLetter() {
    return (
        <>

            <Card className='p-6 border-0'>
                <CardContent className='bg-DarkOrange grid grid-cols-12 gap-y-6  
                  lg:gap-10  justify-items-center items-center rounded-xl shadow-2xl  py-10 md:px-8 max-w-6xl  mx-auto  lg:px-16'>
                    <div className="md:col-span-8 col-span-12">
                        <div className="flex flex-col gap-6 items-center md:items-start ">
                            <h3 className='font-semibold text-3xl text-center lg:text-start lg:text-4xl  text-white'>Subscribe to our newsletter</h3>
                            <p className='text-white'>Discover the best content creation tools, news, resources, memes, and jobs — sent to your inbox every Tuesday.</p>
                            <div className="">
                                <iframe src="https://embeds.beehiiv.com/c8b47983-58f2-410d-9d69-f10d79908089?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no"
                                    className='bg-transparent m-0 rounded-none'
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                        {/* svg icon */}
                        <div>
                            <Image
                                src="https://www.coldemail.fyi/cta-home.svg"
                                width={200}
                                height={200}
                                alt="Svg Icon"
                            />
                        </div>
                    </div>
                </CardContent>
              
            </Card>
        </>
    )
}
