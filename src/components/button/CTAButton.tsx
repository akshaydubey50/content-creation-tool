"use client"
import React from 'react';

export default function CTAButton({value}:{value:string}) {
    return (
        <React.Fragment>
            <div className="flex flex-1 flex-row justify-center items-center py-[20px] text-white text-base md:text-xl font-bold">
                <button className="bg-DarkOrange hover:bg-light-yellow focus:bg-DarkOrange rounded-full px-6 py-2">{value}</button>
            </div>
        </React.Fragment>
    )
}
