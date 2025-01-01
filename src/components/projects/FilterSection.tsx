'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


export default function ProjectFilterSection() {
    const { projectList, isLoading } = useSelector((state: RootState) => state.projects);
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [projectType, setProjectType] = useState('')

    const getProjectCategory = useMemo(() => {
        const categoryList = new Set();
        if (projectList?.length > 0) {
            projectList.forEach((project) => {
                if (project.fields?.Category?.[0]) {
                    categoryList.add(project.fields?.Category[0]);
                }
            });
        }
        return Array.from(categoryList) as string[];
    }, [projectList]);

    const getProjectType = useMemo(() => {
        const projectTypeList = new Set();
        if (projectList?.length > 0) {
            projectList.forEach((project) => {
                if (project.fields?.ProjectType) {
                    projectTypeList.add(project.fields?.ProjectType);
                }
            });
        }
        return Array.from(projectTypeList) as string[];
    }, [projectList]);

 

    return (
        <div className="mb-8 flex flex-col md:flex-row gap-4">
            <Input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow"
            />
            <Select value={category} onValueChange={setCategory} >
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className='bg-white '>
                    {getProjectCategory?.map((category, index) => (
                        <SelectItem className='hover:bg-gray-200 cursor-pointer' key={index} value={category}>{category}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent className='bg-white '>
                    {getProjectType?.map((category, index) => (
                        <SelectItem className='hover:bg-gray-200 cursor-pointer' key={index} value={category}>{category}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

