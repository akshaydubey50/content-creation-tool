import React from 'react'

export default function NewsLetter() {
    return (
        <section className="grid grid-cols-12 gap-y-6  
                  lg:gap-10 lg:mx-auto  rounded-xl shadow-2xl lg:pt-16 pt-10 pb-14 max-w-7xl py-5 mx-8 px-10 lg:px-16  bg-orange-500">
            <div className="lg:col-span-10 col-span-12">
                <div className="flex flex-col gap-6">
                    <h3 className='font-semibold text-3xl text-center lg:text-start lg:text-4xl  text-white'>Subscribe to our newsletter</h3>
                    <p className='text-white'>2,500+ landing page builders have already subscribed.</p>
                    <div className="">
                            <iframe src="https://embeds.beehiiv.com/c8b47983-58f2-410d-9d69-f10d79908089?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no"
                                className='bg-transparent m-0 rounded-none'
                            ></iframe>     
                    </div>
                </div>
            </div>
            <div className="lg:col-span-2 col-span-12">
                {/* svg icon */}
                <div className="">
                    <img src="https://www.coldemail.fyi/cta-home.svg" alt="icon"  />
                </div>
            </div>
        </section >
    )
}
