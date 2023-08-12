"use client"
import React from 'react'
import BreadCrumb from '../breadcrumb/breadcrumb'
import Image from "next/image";
import { BsBookmark } from 'react-icons/bs';

export default function AffiliateToolBanner() {
    return (
        <>
            <main className='bg-light-gray  p-10 md:px-20 md:py-16 md:mb-12'>
                <BreadCrumb />
                <div className="affiliate-tool-container  space-y-8 flex flex-col lg:flex-row  lg:space-x-20 my-12">
                    <div className="aftl-left-section border border-black border-solid rounded-t-xl w-72 ">
                        <Image
                            alt="logo bannero"
                            loading="lazy"
                            width="400"
                            height="400"
                            decoding="async"
                            data-nimg="1"
                            className="rounded-t-xl w-full h-full  object-contain"
                            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Ff7d95ad62eb920e10e24d9622cace8f1.cdn.bubble.io%2Ff1679057707435x141688706130410850%2Fai-copywriting-copy.ai.png?w=768&h=407&auto=enhance&dpr=1&q=100&fit=max"
                        //   style="color: transparent"
                        />
                    </div>
                    <div className="aftl-right-section ">
                        <div className="flex flex-col flex-1 space-y-4 mb-6">
                            <h1 className='text-Heading-Medium md:text-Heading-Large font-bold'>GTmetrix</h1>
                            <p className='ml-0 text-Description'>GTmetrix was developed by Carbon60 as a tool for customers to easily test the performance of their webpages.</p>
                        </div>
                        <div className="aftl-category   flex flex-1 text-xl justify-between md:justify-center lg:justify-start   md:space-x-20">
                            <div className=" rounded-full bg-white border border-solid border-black text-center">
                            <button className=' px-10 md:px-16 py-2 font-bold '> Other</button>
                            </div>
                            <div className="rounded-full  bg-gray-400 text-white border border-solid border-black text-center">
                            <button className='px-10 md:px-16 py-2 font-bold '>Free</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between md:justify-center md:space-x-20 lg:justify-between   lg:w-1/3 lg:space-x-0 lg:pr-10 items-center">
                    <div className="bg-DarkOrange rounded-full text-tags">
                        <button className='px-6 md:px-8 py-2 text-white font-semibold '>Visit Website</button>
                    </div>
                    <BsBookmark size={24} color="black" />
                </div>
            </main>
        </>
    )
}
