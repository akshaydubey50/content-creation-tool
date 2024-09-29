import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react';


export default function ResourceSidebar() {
    const [activeCatgeory, setActiveCatgeory] = useState<number>(1);
    const resCat = [
        { name: "Tools", id: 1 },
        { name: "Jobs", id: 2 },
        { name: "Memes", id: 3 },
        { name: "News", id: 4 },
        { name: "Resources", id: 5 },
    ]
    const handleCategory = (id: number) => {
        setActiveCatgeory(id);
    }
    
    return (
        <>
            {resCat?.map((item) => {
                return (
                    <div
                        key={item.id}
                        className={`group py-2 rounded-md pl-4 hover:cursor-pointer font-medium my-2 hover:text-white hover:bg-black  flex justify-between items-center ${activeCatgeory === item.id ? "bg-black text-white" : "bg-transparent text-black"}`}
                        onClick={() => handleCategory(item.id)}
                    >
                        <div>{item.name}</div>
                        <ChevronRight className={`text-white opacity-0 group-hover:opacity-100 ${activeCatgeory === item.id ? "text-black opacity-100" : "text-white"}`} />
                    </div>
                )
            })}
        </>
    )
}
