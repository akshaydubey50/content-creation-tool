import React from 'react';
import VisitWebsite from "../visit-website/VisitWebsite";
import { useSession } from "next-auth/react";
import { ResourceModel } from "@/models/airtable.model";

export function ResourceTool({ record }: { record: ResourceModel }) {
    const { data: session } = useSession();
    const { id, fields } = record;
    const { Name, Description, Tags, URL } = fields;

    return (
        <div className="rounded-2xl max-w-sm shadow-lg">
            <section className="bg-light-gray p-6 rounded-2xl border border-black h-full flex flex-col">
                <div className="flex flex-col h-full">
                    <div className="h-14 mb-4"> 
                        <h1 className="font-bold text-Title-Medium md:text-Title-Large line-clamp-2">
                            {Name}
                        </h1>
                    </div>
                    <p className="text-Description line-clamp-3 flex-grow mb-4">{Description}</p>
                    <div className="mt-auto space-y-4">
                        {Tags && (
                            <span className="inline-block bg-white rounded-full text-tags font-medium border border-solid border-black px-4 py-1">
                                {Tags}
                            </span>
                        )}
                        <div className="flex justify-between items-center">
                           { URL && <VisitWebsite url={URL} />}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}