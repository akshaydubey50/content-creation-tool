"use client"
import React from 'react'
import BreadCrumb from '../breadcrumb/breadcrumb'
import Image from "next/image";
import { BsBookmark } from 'react-icons/bs';

export default function AffiliateToolBanner() {
    return (
        <>
            <main className='bg-light-gray px-20 py-16 md:mb-12'>
                <BreadCrumb />
                <div className="affiliate-tool-container md:flex flex-1    space-x-20 my-12">
                    <div className="aftl-left-section border border-black border-solid rounded-t-xl">
                        <Image
                            alt="logo banner"
                            loading="lazy"
                            width="400"
                            height="400"
                            decoding="async"
                            data-nimg="1"
                            className="rounded-t-xl w-full object-contain"
                            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Ff7d95ad62eb920e10e24d9622cace8f1.cdn.bubble.io%2Ff1679057707435x141688706130410850%2Fai-copywriting-copy.ai.png?w=768&h=407&auto=enhance&dpr=1&q=100&fit=max"
                        //   style="color: transparent"
                        />
                    </div>
                    <div className="aftl-right-section">
                        <div className="flex flex-col flex-1 space-y-10 mb-6">
                            <h1 className='text-5xl font-bold'>GTmetrix</h1>
                            <p className='ml-0 text-2xl'>GTmetrix was developed by Carbon60 as a tool for customers to easily test the performance of their webpages.</p>
                        </div>
                        <div className="aftl-category flex flex-1 text-xl  space-x-20">
                            <div className=" rounded-full bg-white border border-solid border-black">
                            <button className='px-16 py-2 font-bold'> Other</button>
                            </div>
                            <div className="rounded-full  bg-gray-400 text-white border border-solid border-black">
                            <button className='px-16 py-2 font-bold '>Free</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-80 items-center">
                    <div className="bg-DarkOrange rounded-full">
                        <button className='px-8 py-2 text-white font-semibold '>Visit Website</button>
                    </div>
                    <BsBookmark size={24} color="black" />

                </div>
            </main>
        </>
    )
}
