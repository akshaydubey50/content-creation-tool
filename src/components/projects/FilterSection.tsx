'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ProjectModel } from '../../models/airtable.model'
import { setGroupFilter } from '@/redux/slice/projects/projects.slice'

export default function ProjectFilterSection() {
    const { projectList } = useSelector((state: RootState) => state.projects)
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [projectType, setProjectType] = useState('all')

    // Combined filter function that handles all filter types
    const applyFilters = useCallback(() => {
        if (!projectList?.length) return

        const filteredProjects = projectList.filter((project: ProjectModel) => {
            const matchesSearch = !search ||
                project.fields["Project Title"]?.toLowerCase().includes(search.toLowerCase())

            const matchesCategory = category === 'all' ||
                project.fields.Category?.includes(category)

            const matchesProjectType = projectType === 'all' ||
                project.fields.ProjectType?.toLowerCase() === projectType.toLowerCase()

            return matchesSearch && matchesCategory && matchesProjectType
        })

        dispatch(setGroupFilter({ groupFilter: filteredProjects }))
    }, [projectList, search, category, projectType, dispatch])

    // Handle individual filter changes
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleCategoryChange = (selectedCategory: string) => {
        setCategory(selectedCategory)
    }

    const handleProjectTypeChange = (selectedType: string) => {
        setProjectType(selectedType)
    }

    // Apply filters whenever any filter value changes
    useEffect(() => {
        applyFilters()
    }, [search, category, projectType, applyFilters])

    // Memoized unique categories and project types
    const getProjectCategory = useMemo(() => {
        const categorySet = new Set<string>()
        projectList?.forEach((project) => {
            project.fields?.Category?.forEach(cat => categorySet.add(cat))
        })
        return Array.from(categorySet)
    }, [projectList])

    const getProjectType = useMemo(() => {
        const projectTypeSet = new Set<string>()
        projectList?.forEach((project) => {
            if (project.fields?.ProjectType) {
                projectTypeSet.add(project.fields.ProjectType)
            }
        })
        return Array.from(projectTypeSet)
    }, [projectList])

    return (
        <div className="mb-8 flex flex-col md:flex-row gap-4">
            <Input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={handleSearch}
                className="flex-grow"
            />
            <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                    <SelectItem value="all">All Categories</SelectItem>
                    {getProjectCategory?.map((category, index) => (
                        <SelectItem
                            className='hover:bg-gray-200 cursor-pointer'
                            key={index}
                            value={category}
                        >
                            {category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={projectType} onValueChange={handleProjectTypeChange}>
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                    <SelectItem value="all">All Types</SelectItem>
                    {getProjectType?.map((type, index) => (
                        <SelectItem
                            className='hover:bg-gray-200 cursor-pointer'
                            key={index}
                            value={type}
                        >
                            {type}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}