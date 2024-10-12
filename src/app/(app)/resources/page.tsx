import Resource from "@/components/resources";

export default function Resources() {
  return (
    <>
      <div className="min-w-xs bg-light-gray pt-[80px] h-[250px] lg:h-[300px] flex items-center justify-center px-4">
        <div className="mx-auto max-w-8xl ">
          <h1 className="text-2xl font-bold text-center md:text-4xl lg:text-6xl">
            Content Creation <span className="text-DarkOrange">Resource</span>{" "}
          </h1>
        </div>
      </div>
      <div className="px-4 mx-auto min-w-xs max-w-8xl">
        <Resource />
      </div>
    </>
  );
}
