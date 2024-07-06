// Pagination.js
import React, { useState,useEffect   } from 'react';
interface PaginationProps {
    currentPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

import { SkipForward, ChevronRight, SkipBack, ChevronLeft } from 'lucide-react';



function Pagination({ currentPage, totalItems, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / 9);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const [inputValue, setInputValue] = useState(currentPage.toString());
    const handlePageChange = (page:number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };
    

 

    const currentPageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value;
        // Only allow numeric input
        if (/^\d*$/.test(inputVal)) {
            const numValue = parseInt(inputVal);
            if (!isNaN(numValue)) {
                if (numValue > totalPages) {
                    setInputValue(totalPages.toString());
                    handlePageChange(totalPages)

                } else if (numValue < 1) {
                    setInputValue('1');
                    handlePageChange(numValue)

                } else {
                    setInputValue(inputVal);
                    handlePageChange(numValue)

                }
            } else if (inputVal === '') {
                setInputValue('');
            }
        }
    };
    useEffect(() => {
        setInputValue(currentPage.toString());
    }, [currentPage]);

    return (
        <div className='flex flex-row justify-center items-center my-6 gap-6 py-5 px-10 lg:px-8 2xl:px-0'>

            <button className={`hidden md:block px-4 py-2   rounded-md shadow-lg ${isFirstPage ? 'cursor-not-allowed' : 'cursor-pointer font-semibold'}  ${isFirstPage ? 'bg-white text-DarkOrange border border-DarkOrange ' : 'bg-DarkOrange text-white'}  `} disabled={isFirstPage} onClick={() => handlePageChange(1)}>
                <span className='text-xl'>
                    <SkipBack   />
               </span>
            </button>


            <button className={`px-4 py-2  rounded-md  shadow-lg ${isFirstPage ? 'cursor-not-allowed' : 'cursor-pointer font-semibold'}  ${isFirstPage ? 'bg-white text-DarkOrange border border-DarkOrange' : 'bg-DarkOrange text-white'}  `} disabled={isFirstPage} onClick={() => handlePageChange(currentPage - 1)}>
                <span className='flex items-center space-x-1'>
                    <ChevronLeft />
                    <span>Previous</span>
                </span>
            </button>

               <div className="">
                <div className="flex space-x-2 items-center">
                    {/* Page: {currentPage} of {totalPages} */}
                    <input type="text" value={inputValue} onChange={currentPageHandler} className='w-10 text-center border-2 border-black rounded p-1 outline-none' />
                    <p>of</p>
                    <p>{totalPages}</p>
                </div>
               </div>
            <button className={`px-4 py-2  rounded-md  shadow-lg ${isLastPage ? 'cursor-not-allowed' : 'cursor-pointer font-semibold'}  ${isLastPage ? 'bg-white text-DarkOrange border border-DarkOrange' : 'bg-DarkOrange text-white'}  `} disabled={isLastPage} onClick={() => handlePageChange(currentPage + 1)}>
                <span className='flex items-center space-x-1'>
                    <span>Next</span>
                    <ChevronRight />
                </span>
            </button>
            <button className={`hidden md:block rounded px-4 py-2  shadow-lg ${isLastPage ? 'cursor-not-allowed' : 'cursor-pointer font-semibold'}  ${isLastPage ? 'bg-white text-DarkOrange border border-DarkOrange' : 'bg-DarkOrange text-white'} `} disabled={isLastPage} onClick={() => handlePageChange(totalPages)}>
                <SkipForward />
            </button>
        </div>
    );
}

export default Pagination;
