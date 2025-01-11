import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from 'lucide-react'

export default function ExpertCard({ expert }: any) {
  console.log("expert", expert)
  const { "First Name": firstName, "Last Name": lastName, ExpertType, ProfileImage, "Professional Bio": professionalBio, Verified, Country, Headline, Skills:skills } = expert;


  const defaultImage = "https://placehold.co/50x50/png"

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start space-x-6">
          <Image
            src={ProfileImage || defaultImage}
            alt={`${firstName}${lastName}`}
            width={60}
            height={60}
            className="rounded-full"
          />
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <p className="text-lg font-medium text-gray-900">
                  {`${firstName} ${lastName}`} <span className="text-gray-500">{Country}</span>
                </p>
                {Verified && (
                  <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <Badge variant="outline" className="text-xs">
                {ExpertType}
              </Badge>
            </div>
            <p className="text-base text-gray-500">
              {Headline}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills?.slice(0, 5)?.map((skill: any, skillIndex: number) => (
                <Badge key={skillIndex} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {skills?.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{skills.length - 5}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {professionalBio}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
