import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import FAQJSON from "@/components/faq/faq.json";

export default function FAQ() {
  return (
    <section className="lg:mx-auto rounded-xl max-w-7xl py-5 mx-10 lg:px-16 bg-white-200 my-10">
      <h2 className="text-center font-semibold text-4xl my-4">
        Frequently Ask Questions
      </h2>
      <Accordion type="single" collapsible className="w-full text-start">
        {FAQJSON.map((item) => (
          <AccordionItem key={item.value} value={item.value} className="py-2">
            <AccordionTrigger className="hover:no-underline text-xl font-medium">
              {item.title}
            </AccordionTrigger>
            {!item.categories && (
              <AccordionContent className="text-lg text-gray-600  ">
                {item.content}
              </AccordionContent>
            )}
            {item.categories && (
              <AccordionContent className="text-lg">
                {item.content}
                <ol className="list-decimal text-DarkOrange">
                  {item.categories.map((list, index) => (
                    <li
                      key={`${index}_${list}`}
                      className="px-2 text-gray-600   "
                    >
                      {list}
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
