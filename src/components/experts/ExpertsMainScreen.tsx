import { useSelector } from "react-redux"
import ExpertList from "./ExpertList"
import ExpertsFilter, { SearchBar } from "./ExpertsFilter"
import { ExpertsFilterSkeleton, SearchBarSkeleton } from "./ExpertFilterSkeleton"


export default function Home({ itemsCount }: { itemsCount: number }) {
  const { isLoading } = useSelector((state: any) => state.experts)
 
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          {isLoading ? <ExpertsFilterSkeleton /> : <ExpertsFilter />}
        </aside>
        <section className="w-full md:w-3/4">
          {isLoading ? <SearchBarSkeleton /> : <SearchBar />}
          <ExpertList itemsCount={itemsCount} />
        </section>
      </div>
    </main>
  )
}

