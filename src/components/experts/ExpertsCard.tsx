import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { MapPin, MessageCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { usePagination } from '@/hooks/usePagination'
import Pagination from '../pagination/Pagination'
import { usePaginatedFilteredProducts } from '@/hooks/useFilteredProduct'
import Link from 'next/link'
import IndiaFlag from '@/assets/images/india-flag-icon.png';


const placeholderImage_50 ="https://placehold.co/50x50/png"

export default function ExpertsCard({ listItem,itemsCount }: any) {
const {currentPage,setCurrentPage,handlePageChange,updateCurrentProducts}= usePagination(12); 
const sliceItem = updateCurrentProducts(listItem);  
    const getUserName = (obj: any) => {
        const firstName = obj?.fields["First Name"];
        const lastName = obj?.fields["Last Name"];

        if (firstName && lastName) {
            return `${firstName} ${lastName}`;
        } else {
            return "UserCCFYI";
        }
    };
    
    const getProfileImage = (obj: any) => {
        if (obj?.fields?.ProfileImage) {
            return obj?.fields?.ProfileImage
        }
        else {
            return placeholderImage_50
        }
    } 

    return (

        <React.Fragment>
            {sliceItem?.map((item: any, index: number) => (
                <React.Fragment key={`${item.id}_${index}`}>
                    <Card className='px-6 pt-6 pb-4 mb-4 shadow-md'> 

                        <div className="flex justify-between ">
                            <div className="flex space-x-6">
                                <div className="rounded-full">
                                    <Image
                                        src={getProfileImage(item)}
                                        alt={`banner`}
                                        loading="lazy"
                                        width={"70"}
                                        height={"70"}
                                        className='rounded-full'
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <div className="flex space-x-6 items-center">
                                        <h2 className='text-xl font-medium '>
                                            {getUserName(item)}
                                        </h2>
                                            <Image src={IndiaFlag} alt="Country flag" width={25} height={25} />
                                    </div>
                                    {item?.fields.Skills && <SkillDisplay skillList={item?.fields?.Skills} />}

                                </div>
                            </div>
                           
                            <div className=''>
                                <span className='bg-Orange-200 text-gray-800 rounded-full px-6  py-1 text-sm'>
                                {item?.fields?.ExpertType[0]}
                                </span>
                            </div>
                        </div>

                        {/* <div className='my-4 line-clamp-2 text-gray-400 text-sm'>
                            {item.fields?.['Professional Bio']}
                            <span className='cursor-pointer font-bold'>Read more</span> 
                        </div> */}
                        <ProfessionalBio item={item} />
                    </Card>
                </React.Fragment>
            ))}
            <Pagination currentPage={currentPage}
                itemsCount={itemsCount}
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
            <div className='flex items-center  space-x-2  cursor-pointer'>
                {skillDisplayList?.map((skill: any, index: number) => (
                    <p key={`${skill}_${index}`} className='px-4 py-1 text-xs bg-white border border-gray-300 rounded-full'>{skill}</p>
                ))}
                {remainSkillCount > 0 && (
                    <p className="px-4 py-1 text-xs font-medium bg-gray-100 border border-gray-300 rounded-full">
                        +{remainSkillCount} skills
                    </p>
                )}
            </div>


        </React.Fragment>
    )
}


const ProfessionalBio = ({ item }:any) => {
  
    const bioRef = useRef<any>(null);
    const [isClamped, setIsClamped] = useState<any>(false);

    useEffect(() => {
        if (bioRef.current) {
            setIsClamped(bioRef.current.scrollHeight > bioRef.current.offsetHeight);
        }
    }, [item?.fields]);

    return (
        <div className="relative text-sm text-gray-400 mt-4">
            <p
                ref={bioRef}
                className="line-clamp-2 text-ellipsis overflow-hidden"
            >
                {item?.fields?.['Professional Bio']}
            </p>
            {isClamped && (
                <span className="absolute font-bold bottom-0 right-0 bg-white px-1 cursor-pointer">
                    ... Read more
                </span>
            )}
        </div>
    );
};

