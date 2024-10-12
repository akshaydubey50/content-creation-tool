import HeroSection from "@/components/herosection/HeroSection";
import Resource from "@/components/resources";
<<<<<<< HEAD

export default function Resources() {
  return (
    <>
      <div className="min-w-xs bg-light-gray pt-[80px] h-[250px] lg:h-[300px] flex items-center justify-center px-4">
        <div className="max-w-8xl   mx-auto ">
          <h1 className="font-bold text-2xl md:text-4xl text-center lg:text-6xl">
            Content Creation <span className="text-DarkOrange">Resource</span>{" "}
          </h1>
=======
import { useRouter } from "next/navigation";

export default function Resources() {
    return (
      <>


        <div className="min-w-xs bg-light-gray pt-[80px] h-[250px] lg:h-[300px] flex items-center justify-center px-4">
          <div className="max-w-8xl   mx-auto ">
            <h1 className="font-bold text-2xl md:text-4xl text-center lg:text-6xl">Content Creation FYI <span className="text-DarkOrange">Resource</span> </h1>
          </div>
>>>>>>> cae97962524241578de1feefbabeb8d57851d337
        </div>
        <div className="min-w-xs max-w-8xl mx-auto px-4">
          <Resource />
        </div>

       
      </>
    );
}
