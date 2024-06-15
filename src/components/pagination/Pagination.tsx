// Pagination.js
import React from 'react';
interface PaginationProps {
    currentPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalItems, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / 9);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePageChange = (page:number) => {
        onPageChange(page);
    };

    return (
        <div className='flex justify-center my-6 gap-6'>
            <button className={`px-4 py-2   rounded-md font-semibold shadow-lg ${isFirstPage ? 'cursor-not-allowed' : 'cursor-pointer'}  ${isFirstPage ? 'bg-white text-DarkOrange border border-DarkOrange ' : 'bg-DarkOrange text-white'}  `} disabled={isFirstPage} onClick={() => handlePageChange(1)}>&lt;&lt; First</button>
            <button className={` px-4 py-2  rounded-md font-semibold shadow-lg  ${isFirstPage ? 'cursor-not-allowed' : 'cursor-pointer'}  ${isFirstPage ? 'bg-white text-DarkOrange border border-DarkOrange' : 'bg-DarkOrange text-white'}  `} disabled={isFirstPage} onClick={() => handlePageChange(currentPage - 1)}>&lt; Prev</button>
            <div className="flex space-between items-center">
                Page: {currentPage} of {totalPages}
            </div>
            <button className={`px-4 py-2  rounded-md font-semibold shadow-lg ${isLastPage ? 'cursor-not-allowed' : 'cursor-pointer'}  ${isLastPage ? 'bg-white text-DarkOrange border border-DarkOrange' : 'bg-DarkOrange text-white'}  `} disabled={isLastPage} onClick={() => handlePageChange(currentPage + 1)}>Next &gt;</button>
            <button className={`rounded px-4 py-2   font-semibold shadow-lg ${isLastPage ? 'cursor-not-allowed' : 'cursor-pointer'}  ${isLastPage ? 'bg-white text-DarkOrange border border-DarkOrange' : 'bg-DarkOrange text-white'} `} disabled={isLastPage} onClick={() => handlePageChange(totalPages)}>Last &gt;&gt;</button>
        </div>
    );
}

export default Pagination;
