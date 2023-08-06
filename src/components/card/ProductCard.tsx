"use client"
import React from "react";
import Image from "next/image";
import { BsBookmark } from 'react-icons/bs';
import CTAButton from "../button/CTAButton";
import Link from "next/link";

export default function ProudctCard() {
  return (
    <>
      <main className="px-8  grid grid-cols-1 gap-y-5 md:grid-cols-2  md:gap-6 lg:grid-cols-3 lg:gap-9 mx-auto w-fit  justify-items-center my-[20px]">
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
      </main>
      <CTAButton value="Load More" />
    </>
  );
}

function CardContainer() {
  return (
    <>
    <Link href="/tool-details">
    <div className="rounded-2xl max-w-sm  flex flex-col  border border-black border-solid  shadow-2xl ">
      <section className="w-full  border-b border-black border-solid">
        <Image
          alt="logo banner"
          loading="lazy"
          width="400"
          height="400"
          decoding="async"
          data-nimg="1"
          className="rounded-t-xl w-full"
          src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Ff7d95ad62eb920e10e24d9622cace8f1.cdn.bubble.io%2Ff1679057707435x141688706130410850%2Fai-copywriting-copy.ai.png?w=768&h=407&auto=enhance&dpr=1&q=100&fit=max"
        //   style="color: transparent"
        />
      </section>
      <section className="bg-[#F5F5F5] py-[30px] px-[20px] rounded-b-2xl">
        <div className="pb-[15px] flex flex-1 flex-row justify-between">
          <h1 className="font-bold text-lg md:text-2xl">GTmetrix</h1>
          <h1>👍 1</h1>
        </div>
        <article className="text-base md:text-xl ">
          <p>
            GTmetrix was developed by Carbon60 as a tool for customers to easily
            test the performance of their webpages.
          </p>
          <button className="bg-white rounded-full border border-solid border-black my-6 px-4 py-1">
            Other
          </button>
        </article>
        <div className="text-white  font-semibold flex justify-between items-center text-base md:text-xl">
          <button className="px-5 py-2 rounded-full bg-DarkOrange ">
            Visit Website
          </button>
          <BsBookmark size={24} color="black" />
        </div>
      </section>
    </div>
    </Link>
    </>

  );
}
