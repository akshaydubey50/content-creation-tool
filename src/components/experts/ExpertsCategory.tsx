import React, { useState } from 'react'
import { Settings2 } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { setFilter } from '@/redux/slice/experts/experts.slice'



export default function ExpertsCategory({ categoryList }: any) {
  const dispatch: AppDispatch = useDispatch();
  const selectedCategories = useSelector((state: RootState) => state.experts.filter.category);

  const handleSelectCategory = (category: any) => {
    const currentCategories = selectedCategories || [];
    
    const updatedCategories = currentCategories?.includes(category)
      ? currentCategories.filter(item => item !== category) 
      : [...currentCategories, category];               

    dispatch(setFilter({
      category: updatedCategories
    }));
  }

  return (
    <section className='px-6 py-4 my-4 rounded-md bg-light-gray'>
      <div className="flex items-center mb-3 space-x-2 font-semibold">
        <Settings2 className="w-5 h-5 text-gray-600" />
        <p className="text-gray-700 ">Category</p>
      </div>
      
      {categoryList()?.map((item: any, index: number) => (
        <div 
          key={`category-${index}`}
          className={`flex items-center justify-between px-4 py-2.5 mb-2 bg-white border border-gray-300 rounded-md hover:border-black transition-colors duration-200 hover:cursor-pointer  ${selectedCategories?.includes(item) ? 'border-2 border-black' : ''}`}
          onClick={() => handleSelectCategory(item)}
        >
          <p className="text-sm text-gray-700">{item}</p>
          <Checkbox
            id={`category-${index}`}
            checked={selectedCategories?.includes(item)}
            onCheckedChange={() => handleSelectCategory(item)}
            className="h-4 w-4 rounded border 
            accent-black
              border-black
              data-[state=checked]:bg-black
              data-[state=checked]:text-white
              data-[state=checked]:border-black
              "
          />
        </div>
      ))}
    </section>
  )
}