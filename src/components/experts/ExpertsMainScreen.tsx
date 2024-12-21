"use client"

import React, { useCallback, useEffect, useState } from 'react'
import ExpertsCategory from './ExpertsCategory'
import ExpertsCard from './ExpertsCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExpertsList, setVerifiedChecked } from '@/redux/slice/experts/experts.slice'
import { AppDispatch, RootState } from '../../redux/store'
import { Input } from '../ui/input'
import { setSearchQuery } from '@/redux/slice/experts/experts.slice'
import { X } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import useFilterExperts from '@/hooks/useFilterExperts'

export default function ExpertsMainScreen() {
  const expertList = useSelector((store: RootState) => store.experts.expertsList)
  const dispatch: AppDispatch = useDispatch()
    const { getSkillCategoryList , filterList } = useFilterExperts();

    useEffect(() => {
      if (expertList.length === 0) {
        dispatch(fetchExpertsList())
      }
    }, [dispatch, expertList.length])

  return (
    <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-8">
      <div className="grid grid-cols-12 gap-x-20">
        <div 
          className={`
            col-span-3 
            }
          `}
        >
            <ExpertsCategory categoryList={getSkillCategoryList} />
        </div>

        <div className="col-span-9">
          <div className="grid grid-cols-12 place-items-center">
            <div className="w-full col-span-9">
              <ExpertsSearchInput dispatch={dispatch} />
            </div>
            {/* <div className="col-span-3">
              <ExpertsVerifiedStatus dispatch={dispatch} />
            </div> */}
          </div>
          <ExpertsCard listItem={filterList} />
        </div>
      </div>
    </div>
  )
}

function ExpertsSearchInput({ dispatch }: { dispatch: AppDispatch }) {
  const searchQueryForExperts = useSelector((store: RootState) => store.experts.searchQuery)

  return (
    <div className="relative w-full my-4">
      <Input
        placeholder="Search by Name"
        className="w-full pr-10 focus:ring-0 focus:border-DarkOrange focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-DarkOrange"
        type="text"
        value={searchQueryForExperts}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
      <X
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl text-DarkOrange cursor-pointer transition-opacity duration-300 ${
          searchQueryForExperts ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        onClick={() => dispatch(setSearchQuery(''))}
      />
    </div>
  )
}

function ExpertsVerifiedStatus({ dispatch }: { dispatch: AppDispatch }) {
  const isVerifiedChecked = useSelector((store: RootState) => store.experts.isVerifiedChecked)

  return (
      <div className="flex items-center space-x-2">
          <Switch
              checked={isVerifiedChecked}
              onCheckedChange={() => dispatch(setVerifiedChecked(!isVerifiedChecked))}
              id="verified-status"
              className="data-[state=checked]:bg-DarkOrange data-[state=unchecked]:bg-gray-300 w-11 h-6 transition-colors duration-200 ease-in-out rounded-full"
          />
          <Label
              htmlFor="verified-status"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
              Verified Status
          </Label>
      </div>
  )
}