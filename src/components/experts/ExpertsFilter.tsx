'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Search, X } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { updateFilters } from "@/redux/slice/experts/experts.slice"
import { useState } from 'react'
import debounce from 'lodash/debounce'
import { ExpertModel } from '../../models/airtable.model';

export default function ExpertsFilter() {
  const [skillSearch, setSkillSearch] = useState('')

  const dispatch = useDispatch()
  const expertList = useSelector((state: RootState) => state.experts.expertsList)
  const filters = useSelector((state: RootState) => state.experts.filter)

  const getSkillList = useMemo(() => {
    const skillList = new Set<string>()
    if (!expertList?.length) return []

    expertList.forEach((expert: ExpertModel) => {
      expert.fields?.Skills?.forEach((skill: string) => {
        skillList.add(skill.trim())
      })
    })
    return Array.from(skillList)
  }, [expertList])

  const getLanguageList = useMemo(() => {
    const languageList = new Set<string>()
    if (!expertList?.length) return []

    expertList.forEach((expert) => {
      if (expert.fields?.Country) {
        languageList.add(expert.fields.Country.trim())
      }
    })
    return Array.from(languageList)
  }, [expertList])

  const getExpertTypeList = useMemo(() => {
    const expertTypeList = new Set<string>()
    if (!expertList?.length) return []

    expertList.forEach((expert) => {
      expert.fields?.ExpertType?.forEach((type: string) => {
        expertTypeList.add(type.trim())
      })
    })
    return Array.from(expertTypeList)
  }, [expertList])

  const filteredSkills = useMemo(() => {
    return getSkillList.filter(skill =>
      skill.toLowerCase().includes(skillSearch.toLowerCase())
    )
  }, [getSkillList, skillSearch])

  const handleSkillToggle = useCallback((skill: string) => {
    const updatedSkills = filters.selectedSkills.includes(skill)
      ? filters.selectedSkills.filter(s => s !== skill)
      : [...filters.selectedSkills, skill]
    dispatch(updateFilters({ selectedSkills: updatedSkills }))
  }, [dispatch, filters.selectedSkills])

  const handleLanguageToggle = useCallback((language: string) => {
    const updatedLanguages = filters.selectedLanguages.includes(language)
      ? filters.selectedLanguages.filter(l => l !== language)
      : [...filters.selectedLanguages, language]
    dispatch(updateFilters({ selectedLanguages: updatedLanguages }))
  }, [dispatch, filters.selectedLanguages])

  const handleExpertTypeToggle = useCallback((type: string) => {
    const updatedTypes = filters.selectedExpertTypes.includes(type)
      ? filters.selectedExpertTypes.filter(t => t !== type)
      : [...filters.selectedExpertTypes, type]
    dispatch(updateFilters({ selectedExpertTypes: updatedTypes }))
  }, [dispatch, filters.selectedExpertTypes])



  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Skills</h3>
            <div className="relative mb-2">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <ScrollArea className="h-[180px]">
              <div className="flex flex-wrap gap-2 pr-4">
                {filteredSkills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant={filters.selectedSkills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                    {filters.selectedSkills.includes(skill) && (
                      <X
                        className="ml-1 h-3 w-3"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSkillToggle(skill)
                        }}
                      />
                    )}
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Countries</h3>
            <div className="flex flex-wrap gap-2">
              {getLanguageList.map((language, index) => (
                <Badge
                  key={index}
                  variant={filters.selectedLanguages.includes(language) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleLanguageToggle(language)}
                >
                  {language}
                  {filters.selectedLanguages.includes(language) && (
                    <X
                      className="ml-1 h-3 w-3"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLanguageToggle(language)
                      }}
                    />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Expert Type</h3>
            <div className="space-y-2">
              {getExpertTypeList.map((type, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`expert-type-${index}`}
                    checked={filters.selectedExpertTypes.includes(type)}
                    onCheckedChange={() => handleExpertTypeToggle(type)}
                  />
                  <Label htmlFor={`expert-type-${index}`}>{type}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const SearchBar = () => {
  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.experts.filter)

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      dispatch(updateFilters({ searchQuery: value }))
    }, 300),
    [dispatch]
  )

  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search experts..."
          className="pl-10"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="verified-filter"
          checked={filters.isVerified}
          onCheckedChange={(checked) => dispatch(updateFilters({ isVerified: checked }))}
        />
        <Label htmlFor="verified-filter">Verified only</Label>
      </div>
    </div>
  )
}