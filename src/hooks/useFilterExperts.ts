import { useSelector } from "react-redux"
import { RootState } from '../redux/store';
import { useCallback, useMemo } from "react";

const useFilterExperts = () => {
    // search for experts
    const filterItems = useSelector((store: RootState) => store.experts.filter)
    const expertsList = useSelector((store: RootState) => store.experts.expertsList)
    const searchQuery = useSelector((store: RootState) => store.experts.searchQuery)

    const categorySelectedExperts = () => {

        if (filterItems?.category?.length == 0) {
            return []
        }
        else {
            return expertsList?.filter((expert) => {
                return expert.fields?.Skills?.some((skill: any) => filterItems.category.includes(skill));
            }) || [];
        }

    }
    console.log("categorySelectedExperts", categorySelectedExperts())

    // filter experts by skills
    const searchExperts = () => {
        if (!searchQuery) {
            return []
        }
        return expertsList?.filter((item: any) => {
            const firstName = item.fields?.["First Name"]?.toLowerCase()
            const lastName = item.fields?.["Last Name"]?.toLowerCase()
            const fullName = firstName + " " + lastName
            return fullName?.includes(searchQuery?.toLowerCase())
        })
    }
    console.log("searchExperts", searchExperts())

    // sort experts by verified status
    const verifiedExperts = () => {return [] }


    // default list
    const filterList = useMemo(() => {
        if (categorySelectedExperts().length > 0 ) { 
            return categorySelectedExperts()
        }
        else if(searchExperts().length > 0) {
            return searchExperts()
        }
        else if(verifiedExperts().length > 0) {
            return verifiedExperts()
        }
        else {
            return expertsList
        }

    }, [categorySelectedExperts(), searchExperts(), verifiedExperts()])

    console.log("filterList", filterList)

    const getSkillCategoryList = useCallback(() => {
        const skillList = expertsList?.filter((item:any) => item.fields?.Skills).map((item) => (item.fields?.Skills))
        return [...new Set(skillList.flat().sort())]
    }, [expertsList])

    return {
        filterList,
        getSkillCategoryList

    }
}
export default useFilterExperts