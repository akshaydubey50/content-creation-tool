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
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <Image
                src={ProfileImage || defaultImage}
                alt={`${firstName}${lastName}`}
                width={60}
                height={60}
                className="rounded-full w-12 h-12 sm:w-14 sm:h-14"
              />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <p className="text-base sm:text-lg font-medium text-gray-900">
                    {`${firstName} ${lastName}`}
                    <span className="text-gray-500 sm:ml-2 ml-1 text-sm uppercase">
                      {Country?.slice(0, 2)}
                    </span>
                  </p>
                  {Verified && (
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <Badge variant="outline" className="text-xs sm:self-start">
                  {ExpertType}
                </Badge>
              </div>
              <p className="text-sm sm:text-base text-gray-500 line-clamp-2">
                {Headline}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skills?.slice(0, 3)?.map((skill: any, skillIndex: number) => (
                  <Badge key={skillIndex} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {skills?.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{skills.length - 3}
                  </Badge>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 pt-1">
                {professionalBio}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
