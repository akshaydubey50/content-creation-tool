"use client";
import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const page = ({ params: { slug } }: any) => {
  return (
    <div className="max-w-4xl mx-auto h-screen pt-10 px-4">
      <div className="  flex flex-col mx-auto  space-y-4   pt-[40px] lg:pt-[60px]">
        <div className="flex items-start container mx-auto px-4 py-8 max-w-4xl  ">
          <Breadcrumb categories="prompt" currentPageTitle={slug} key={slug} />
        </div>
        <div className="flex flex-row">
          <div className="flex justify-center items-center">
            <div className="text-5xl font-bold">
              Identify Trending Topics in a Niche{" "}
            </div>
          </div>

          <Card className="mb-6 mt-10 p-4 max-w-xl">
            {/*  <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl font-bold">Title</CardTitle>
              </div>
            </CardHeader> */}
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className=" text-gray-600 whitespace-pre-line">
                    Based on the provided focus area, generate a list of 5
                    potential blog topics that would be interesting and relevant
                    to the target audience. Focus Area: focus_area Target
                    Audience: target_audience
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
