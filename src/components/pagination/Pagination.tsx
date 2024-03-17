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
        <div className='flex justify-center mt-6 gap-6'>
            <button className={`rounded px-4 py-2  text-white font-semibold ${isFirstPage ? 'cursor-not-allowed' : 'cursor-pointer'}  ${isFirstPage ? 'bg-slate-400' : 'bg-DarkOrange'}  `} disabled={isFirstPage} onClick={() => handlePageChange(1)}>&lt;&lt; First</button>
            <button className={`rounded px-4 py-2  text-white font-semibold ${isFirstPage ? 'cursor-not-allowed' : 'cursor-pointer'}  ${isFirstPage ? 'bg-slate-400' : 'bg-DarkOrange'}  `} disabled={isFirstPage} onClick={() => handlePageChange(currentPage - 1)}>&lt; Prev</button>
            <div className="flex space-between items-center">
                Page: {currentPage} of {totalPages}
            </div>
            <button className={`rounded px-4 py-2  text-white font-semibold ${isLastPage ? 'cursor-not-allowed' : 'cursor-pointer'}  ${isLastPage ? 'bg-slate-400' : 'bg-DarkOrange'}  `} disabled={isLastPage} onClick={() => handlePageChange(currentPage + 1)}>Next &gt;</button>
            <button className={`rounded px-4 py-2  text-white font-semibold ${isLastPage ? 'cursor-not-allowed' : 'cursor-pointer'}  ${isLastPage ? 'bg-slate-400' : 'bg-DarkOrange'} `} disabled={isLastPage} onClick={() => handlePageChange(totalPages)}>Last &gt;&gt;</button>
        </div>
    );
}

export default Pagination;
