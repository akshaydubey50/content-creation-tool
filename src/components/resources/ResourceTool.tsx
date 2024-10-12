import React from 'react';
import VisitWebsite from "../visit-website/VisitWebsite";
import { useSession } from "next-auth/react";
import { ResourceModel } from "@/models/airtable.model";

export function ResourceTool({ record }: { record: ResourceModel }) {
    const { data: session } = useSession();
    const { id, fields } = record;
    const { Name, Description, Tags, URL } = fields;

    return (
        <div className="max-w-sm shadow-lg rounded-2xl">
            <section className="flex flex-col h-full p-6 border border-black bg-light-gray rounded-2xl">
                <div className="flex flex-col h-full">
                    <div className="mb-4 h-14"> 
                        <h1 className="font-bold text-Title-Medium md:text-Title-Large line-clamp-2">
                            {Name}
                        </h1>
                    </div>
                    <p className="flex-grow mb-4 text-Description line-clamp-3">{Description}</p>
                    <div className="mt-auto space-y-4">
                        {Tags && (
                            <span className="inline-block px-4 py-1 font-medium bg-white border border-black border-solid rounded-full text-tags">
                                {Tags}
                            </span>
                        )}
                        <div className="flex items-center justify-between">
                           { URL && <VisitWebsite url={URL} btnText="Visit Website" /> }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}