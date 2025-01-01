"use client";
import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectsList } from '@/redux/slice/projects/projects.slice';
import { RootState, AppDispatch } from '../../redux/store';
import Pagination from '../pagination/Pagination';



export default function ProjectList({ itemsCount }: { itemsCount: number }) {
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const dispatch: AppDispatch = useDispatch();
    const { projectList, isLoading } = useSelector((state: RootState) => state.projects);

    useEffect(() => {
        if (projectList?.length === 0) {
            dispatch(fetchProjectsList());
        }
    }, [projectList, dispatch]);
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectList?.map((project, index) => (
                    <ProjectCard key={project.id} id={project.id} fields={project.fields} />
                ))}
            </div>
            <div className="mx-auto">

            <Pagination
                itemsCount={itemsCount}
                currentPage={currentPage}
                totalItems={projectList!.length}
                onPageChange={handlePageChange}
                />
                </div>
        </>
    )
}

