import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, User } from 'lucide-react'
import { useRouter } from 'next/router'
import Link from 'next/link'


export default function ExpertCard({ expert }: any) {
  console.log("expert", expert)
  const getUserName = (obj: any) => {
    const firstName = obj["First Name"]?.toLowerCase()?.trim();
    const lastName = obj["Last Name"]?.toLowerCase()?.trim();

    if (firstName && lastName) {
      return `${firstName}-${lastName}`;
    } else {
      return "UserCCFYI";
    }
  };

  const { "First Name": firstName, "Last Name": lastName, ExpertType, ProfileImage, "Professional Bio": professionalBio, Verified, Country, Headline, Skills: skills,Username } = expert;

  const defaultImage = <User />

  return (
    <Link href={`/experts/${Username}`}>
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
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-medium text-gray-900">
                    {`${firstName} ${lastName}`} <span className="text-gray-500 ml-4 uppercase">{Country.slice(0, 2)}</span>
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
              <div className="flex flex-wrap gap-2 pt-2">
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
              <p className="text-sm text-gray-600 line-clamp-2 pt-2">
                {professionalBio}
              </p>
            </div>
          </div>
        </CardContent>
      </Card></Link>
  )
}
