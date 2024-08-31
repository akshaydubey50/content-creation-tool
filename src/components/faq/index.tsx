import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Script from "next/script";

import FAQJSON from "@/components/faq/faq.json";

export default function FAQ() {
  const schemaString = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Content Creation FYI",
    description:
      "Directory of 200+ content creation tools designed to streamline your process and enhance productivity.",
    url: "https://www.contentcreation.fyi/",
    mainEntity: FAQJSON.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.categories
          ? `${item.content} ${item.categories.join(", ")}`
          : item.content,
      },
    })),
  });
  return (
    <>
      <Script id="webpage-faq-schema" type="application/ld+json">
        {schemaString}
      </Script>
      <section className="lg:mx-auto rounded-xl max-w-6xl py-5 mx-10 lg:px-16 bg-white-200 my-10">
        <h2 className="text-center font-semibold text-2xl lg:text-4xl my-4">
          Frequently Ask Questions
        </h2>
        <Accordion type="single" collapsible className="w-full ">
          {FAQJSON.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="py-2 cursor-pointer"
            >
              <AccordionTrigger className="hover:no-underline  text-base lg:text-lg font-semibold text-left ">
                {item.title}
              </AccordionTrigger>
              {!item.categories && (
                <AccordionContent className="text-sm lg:text-base font-medium text-gray-600">
                  {item.content}
                </AccordionContent>
              )}
              {item.categories && (
                <AccordionContent className="text-sm lg:text-base font-medium text-gray-600">
                  {item.content}
                  <ul className="list-disc pl-6">
                    {item.categories.map((list, index) => (
                      <li key={`${index}_${list}`}>{list}</li>
                    ))}
                  </ul>
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
