import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from 'lucide-react'

const experts = [
    {
        name: "Shushant Lakhyani",
        countryCode: "IN",
        image: "https://media.licdn.com/dms/image/v2/D4D03AQE0iF-4HmGH2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718250485446?e=1736380800&v=beta&t=PUuLOFUoFohdBmRF8ATjo1r1S6aAI6ie-zDPjhW0tjM",
        headline: "Multi-Platform Growth Expert | LinkedIn, X, & Medium Strategist",
        country: "India",
        expertType: "Freelancer",
        skills: ["Ghostwriting", "Personal Branding", "Newsletter", "Social Media", "Content Marketing"],
        description: "I can help you grow on LinkedIn, X, and Medium. 53,000+ followers on X. 63,000+ followers on LinkedIn, and 7,500+ followers on Medium. Specializing in creating engaging content that resonates with your target audience and drives meaningful engagement across platforms.",
        verified: true,
    },
    {
        name: "Emma Thompson",
        countryCode: "GB",
        image: "/placeholder.svg?height=100&width=100",
        headline: "SEO Specialist & Content Strategist",
        country: "UK",
        expertType: "Agency",
        skills: ["SEO", "Content Strategy", "Analytics", "SEM", "Google Analytics"],
        description: "Experienced in boosting organic traffic and improving search rankings. Developed successful SEO strategies for over 50 clients, resulting in an average 200% increase in organic traffic. Proficient in conducting comprehensive keyword research and optimizing on-page and off-page SEO elements.",
        verified: false,
    },
    {
        name: "Carlos Rodriguez",
        countryCode: "ES",
        image: "/placeholder.svg?height=100&width=100",
        headline: "Video Content Creator & YouTube Consultant",
        country: "Spain",
        expertType: "Freelancer",
        skills: ["Video Editing", "YouTube SEO", "Scriptwriting", "Video Marketing", "Filmmaking"],
        description: "Helped 30+ YouTube channels grow from 0 to 100K subscribers. Expertise in creating viral video content and optimizing for YouTube's algorithm. Fluent in English and Spanish. Specializes in crafting compelling narratives and visually stunning content that captivates audiences and drives channel growth.",
        verified: false,
    },
    {
        name: "Aisha Patel",
        countryCode: "AE",
        image: "/placeholder.svg?height=100&width=100",
        headline: "Social Media Manager & Influencer Collaborator",
        country: "UAE",
        expertType: "In-house",
        skills: ["Social Media Strategy", "Influencer Marketing", "Content Calendar", "Community Management", "Social Listening"],
        description: "Managed social media accounts with a combined following of 2M+. Specializes in creating engaging content and building brand partnerships. Expertise in Instagram, TikTok, and Facebook. Skilled in developing and executing comprehensive social media strategies that align with brand objectives and resonate with target audiences.",
        verified: true,
    },
    {
        name: "John Smith",
        countryCode: "US",
        image: "/placeholder.svg?height=100&width=100",
        headline: "Technical Writer & Documentation Specialist",
        country: "USA",
        expertType: "Freelancer",
        skills: ["API Documentation", "User Guides", "Technical Editing", "Markdown", "XML"],
        description: "10+ years of experience in simplifying complex technical concepts. Created documentation for Fortune 500 tech companies. Proficient in multiple documentation tools and frameworks. Specializes in creating clear, concise, and user-friendly technical documentation that enhances product usability and reduces support inquiries.",
        verified: false,
    },
    {
        name: "Sophie Dubois",
        countryCode: "FR",
        image: "/placeholder.svg?height=100&width=100",
        headline: "Multilingual Content Creator & Localization Expert",
        country: "France",
        expertType: "Agency",
        skills: ["Localization", "Translation", "Cultural Adaptation", "Subtitling", "Transcription"],
        description: "Fluent in 5 languages. Helped global brands adapt their content for European markets. Specializes in maintaining brand voice across different cultures and languages. Expertise in ensuring content resonates with local audiences while maintaining the original message's integrity and brand consistency.",
        verified: true,
    },
    {
        name: "Hiroshi Tanaka",
        countryCode: "JP",
        image: "/placeholder.svg?height=100&width=100",
        headline: "UX Writer & Microcopy Specialist",
        country: "Japan",
        expertType: "Freelancer",
        skills: ["UX Writing", "Microcopy", "User Research", "Information Architecture", "Accessibility"],
        description: "Improved user engagement by 40% through effective microcopy. Worked with leading tech companies to enhance user interfaces and product experiences. Conducts user research to inform content strategy. Specializes in crafting clear, concise, and user-friendly copy that guides users through digital products seamlessly.",
        verified: false,
    },
    {
        name: "Maria Silva",
        countryCode: "BR",
        image: "/placeholder.svg?height=100&width=100",
        headline: "Email Marketing Strategist & Copywriter",
        country: "Brazil",
        expertType: "In-house",
        skills: ["Email Copywriting", "A/B Testing", "Automation", "Email Design", "Campaign Monitoring"],
        description: "Increased email open rates by 50% and click-through rates by 30% for e-commerce clients. Expert in crafting compelling email campaigns and optimizing for conversions. Proficient in major email marketing platforms. Specializes in developing personalized and targeted email strategies that drive engagement and boost ROI.",
        verified: true,
    },
    {
        name: "Alex Chen",
        countryCode: "SG",
        image: "/placeholder.svg?height=100&width=100",
        headline: "Data Journalist & Infographic Designer",
        country: "Singapore",
        expertType: "Freelancer",
        skills: ["Data Visualization", "Research", "Storytelling", "Data Analysis", "Charting"],
        description: "Created award-winning infographics for major news outlets. Specializes in turning complex data into visually appealing and easy-to-understand graphics. Expertise in data analysis and visual storytelling. Skilled in using various data visualization tools to create compelling narratives from complex datasets.",
        verified: false,
    },
    {
        name: "Olivia Brown",
        countryCode: "AU",
        image: "/placeholder.svg?height=100&width=100",
        headline: "Podcast Producer & Audio Content Strategist",
        country: "Australia",
        expertType: "Agency",
        skills: ["Podcast Production", "Audio Editing", "Content Planning", "Sound Design", "Podcast Marketing"],
        description: "Produced top-10 podcasts in multiple categories. Expertise in audio storytelling, interview techniques, and podcast marketing. Helps brands develop and launch successful podcast strategies. Skilled in all aspects of podcast production, from concept development to post-production and distribution.",
        verified: true,
    }
]

export default function ExpertList() {
    return (
        <div className="grid grid-cols-1 gap-6">
            {experts.map((expert, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-6">
                            <Image
                                src={expert.image}
                                alt={expert.name}
                                width={60}
                                height={60}
                                className="rounded-full"
                            />
                            <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-2">
                                        <p className="text-lg font-medium text-gray-900">
                                            {expert.name} <span className="text-gray-500">({expert.countryCode})</span>
                                        </p>
                                        {expert.verified && (
                                            <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                Verified
                                            </Badge>
                                        )}
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {expert.expertType}
                                    </Badge>
                                </div>
                                <p className="text-base text-gray-500">
                                    {expert.headline}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {expert.skills.slice(0, 5).map((skill, skillIndex) => (
                                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                    {expert.skills.length > 5 && (
                                        <Badge variant="secondary" className="text-xs">
                                            +{expert.skills.length - 5}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {expert.description}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

