import ExpertList from "./ExpertList"
import ExpertsFilter, { SearchBar } from "./ExpertsFilter"


export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <ExpertsFilter />
        </aside>
        <section className="w-full md:w-3/4">
          <SearchBar />
          <ExpertList />
        </section>
      </div>
    </main>
  )
}

