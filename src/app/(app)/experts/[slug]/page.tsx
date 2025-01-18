"use client"
import ExpertsDetail from '@/components/experts/ExpertsDetail'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { ExpertModel } from '../../../../models/airtable.model';
import Canonical from '@/components/seo/Canonical';




export default function Details() {
    const pathname = usePathname();
    console.log("pathname", pathname)
    const expertsList = useSelector((store: RootState) => store.experts.expertsList)

    const expert: any = expertsList?.find((item: any) => { 
       return  item?.fields?.Username.indexOf(pathname?.split('/')[2]) !== -1
    })
    return (
        <>
  <Canonical/>
            <ExpertsDetail expert={expert||{}} />
        </>
    )
}
