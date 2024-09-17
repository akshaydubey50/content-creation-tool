import HeroSection from "@/components/herosection/HeroSection";
import PromptLibrary from "@/components/prompt/prompt-library";

export default function Prompt() {
  return (
    <div className="flex flex-col mx-auto  space-y-4 max-w-7xl pt-[40px] lg:pt-[60px] w-full">
      {/* <HeroSection /> */}
      <PromptLibrary />
    </div>
  );
}
