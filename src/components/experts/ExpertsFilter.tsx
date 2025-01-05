import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { Switch } from '../ui/switch'

const skills = [
  "Content Writing", "SEO", "Social Media", "Email Marketing", "Video Production",
  "Graphic Design", "Copywriting", "Content Strategy", "Data Analysis", "UX Writing",
  "Blogging", "Technical Writing", "Storytelling", "Editing", "Proofreading",
  "Brand Messaging", "Scriptwriting", "Podcast Production", "Infographic Design",
  "Marketing Automation", "Content Curation", "Thought Leadership", "Whitepaper Creation"
]
const languages = ["English", "Hindi", "German", "French", "Spanish", "Mandarin", "Japanese", "Arabic", "Portuguese", "Russian"]
const expertTypes = ["Freelancer", "Agency", "In-house"]

export default function ExpertsFilter() {
  const [skillSearch, setSkillSearch] = useState('')
  const filteredSkills = skills?.filter(skill =>
    skill.toLowerCase()?.includes(skillSearch?.toLowerCase())
  )

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
                  <Badge key={index} variant="outline" className="cursor-pointer">
                    {skill}
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((language, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer">
                  {language}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Expert Type</h3>
            <div className="space-y-2">
              {expertTypes.map((type, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`expert-type-${index}`} />
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

export const SearchBar =()=>{
  return (
    <>
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search experts..." className="pl-10" />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="verified-filter" />
          <Label htmlFor="verified-filter">Verified only</Label>
        </div>
      </div>
    </>
  )
}