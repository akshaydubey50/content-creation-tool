import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { MapPin, MessageCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { usePagination } from '@/hooks/usePagination'
import Pagination from '../pagination/Pagination'
import { usePaginatedFilteredProducts } from '@/hooks/useFilteredProduct'
import Link from 'next/link'

export default function ExpertsCard({ listItem }: any) {
const {currentPage,setCurrentPage,handlePageChange,updateCurrentProducts}= usePagination(12); 
const sliceItem = updateCurrentProducts(listItem);   
console.log("sliceItem", sliceItem)

    return (

        <React.Fragment>
            {sliceItem?.map((item: any, index: number) => (
                <React.Fragment key={`${item.id}_${index}`}>
                    <Card className='p-6 mb-4 shadow-md'>

                        <div className="flex justify-between">
                            <div className="flex space-x-6">
                                <div className="rounded-full">
                                    <Image
                                        src={"https://placehold.co/50x50/png"}
                                        alt={`banner`}
                                        loading="lazy"
                                        width={"70"}
                                        height={"70"}
                                        className='rounded-full'
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <h2 className='text-xl font-medium '>{item?.fields?.["First Name"]} {item?.fields?.["Last Name"]}</h2>
                                    <p>Senior UX Expert, 8 Years, 130K+ Hours Research</p>
                                    <p className='flex items-center space-x-2'>
                                        <MapPin />
                                        India
                                        <MessageCircle />
                                        English</p>
                                </div>
                            </div>
                            <Link href={`/experts/${item?.fields?.Username}`}>
                            <Button type='button' className='p-4 text-white bg-black rounded-md'>See Profile</Button>
                            </Link>
                        </div>

                        {item?.fields.Skills && <SkillDisplay skillList={item?.fields.Skills} />}

                    </Card>
                </React.Fragment>
            ))}
            <Pagination currentPage={currentPage}
                totalItems={listItem?.length}
                onPageChange={handlePageChange} />
        </React.Fragment>
    )
}


function SkillDisplay({ skillList }: any) {
    const itemCount = 2;
    const skillDisplayList = skillList?.slice(0, itemCount);
    const remainSkillCount = Math.max(skillList?.length - itemCount, 0);
    return (
        <React.Fragment>
            <div className='flex items-center pt-6 space-x-2 '>
                {skillDisplayList?.map((skill: any, index: number) => (
                    <p key={`${skill}_${index}`} className='px-4 py-1 text-sm bg-white border border-gray-300 rounded-full'>{skill}</p>
                ))}
                {remainSkillCount > 0 && (
                    <p className="px-4 py-1 text-sm font-medium bg-gray-100 border border-gray-300 rounded-full">
                        +{remainSkillCount} skills
                    </p>
                )}
            </div>


        </React.Fragment>
    )
}