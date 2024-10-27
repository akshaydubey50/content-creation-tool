import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { Button } from "@/components/ui/button"
import { Instagram, Linkedin, Twitter } from 'lucide-react'
import IndiaFlag from '@/assets/images/india-flag-icon.png';

interface Expert {
    fields: {
        "First Name": string;
        "Last Name": string;
        "Professional Bio": string;
        Skills: string[];
        Instagram?: string;
        LinkedIn?: string;
        Twitter?: string;
    }
}

export default function ExpertsDetail({ expert }: { expert: Expert }) {
    const { fields } = expert

    return (
        <section className="relative">
            <div className="bg-[#FF8E37CC] h-[250px] lg:h-[300px]" />
            <div className="px-4 mx-auto max-w-9xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 -mt-24 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <div className="p-6">
                            <Image
                                src="https://placehold.co/100x100/png"
                                alt={`${fields["First Name"]} ${fields["Last Name"]}`}
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                            <div className="flex items-center my-4 space-x-4">
                                    <h1 className="text-2xl font-bold">
                                        {fields["First Name"]} {fields["Last Name"]}
                                    </h1>
                                    <Image src={IndiaFlag} alt="Country flag" width={40} height={40} />
                            </div>
                            <div className="flex items-center mb-8 space-x-4">
                                <Button className="bg-[#FF8E37] hover:bg-[#FF8E37]/80 text-white">
                                    Get in touch
                                </Button>
                                {fields.Instagram && (
                                    <Link href={`https://www.instagram.com/${fields.Instagram}`} className="text-gray-400 hover:text-gray-600">
                                        <Instagram className="w-6 h-6" />
                                    </Link>
                                )}
                                {fields.LinkedIn && (
                                    <Link href={`https://www.linkedin.com/in/${fields.LinkedIn}`} className="text-gray-400 hover:text-gray-600">
                                        <Linkedin className="w-6 h-6" />
                                    </Link>
                                )}
                                {fields.Twitter && (
                                    <Link href={`https://twitter.com/${fields.Twitter}`} className="text-gray-400 hover:text-gray-600">
                                        <Twitter className="w-6 h-6" />
                                    </Link>
                                )}
                            </div>
                            <div className="prose max-w-none">
                                <h2 className="mb-4 text-xl font-semibold">Professional Bio</h2>
                                <ReactMarkdown>{fields["Professional Bio"]}</ReactMarkdown>
                            </div>
                            
                        </div>
                    </div>
                    <div className="mt-28 lg:col-span-4">
                        <div className="p-6 ">
                            <h2 className="mb-4 text-xl font-semibold">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {fields.Skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}