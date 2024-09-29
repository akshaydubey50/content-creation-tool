import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { PropmtResourceModel } from "@/models/airtable.model";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";

const PromptCard = ({
  promptResource = {
    id: "recEyJBryU2v9u5KM",
    fields: {
      Source: "GPTBot",
      Name: "Create a social media schedule",
      Category: ["Content Creation"],
      Description:
        "As a skilled social media manager, your task is to formulate a one-month social media posting calendar beginning from [insert date that schedule will start]. The frequency of posts should align with your preference, either [daily/every two days/every weekday/weekly]. Your business, known as [insert name], is engaged in selling [insert products or services]. Each post should detail the publish date, an engaging heading, captivating body text, and relevant hashtags. Ensure that the tone is [professional/casual/funny/friendly] as per our brand’s voice. Additionally, each post should include a suggestion for a suitable image, which could be sourced from a stock image service.",
      Tags: ["LinkedIn", "Instagram", "Twitter"],
      Status: "",
      SourceLink: "",
    },
  },
}: {
  promptResource?: PropmtResourceModel;
}) => {
  const router = useRouter();

  const handlePromptClick = (promptResource: PropmtResourceModel) => {
    // navigate to prompt detail page
    const title = promptResource?.fields?.Name?.toLowerCase()
      .trim()
      .replace(/\s/g, "-");

    router.push(`/prompt/${title}`);

    console.log("PromptCard handlePromptClick", title);
  };
  return (
    <Card className="flex flex-col border-black hover:border-DarkOrange bg-light-gray ">
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {promptResource.fields?.Category?.map((category, categoryIndex) => (
            <span
              key={categoryIndex}
              className="border px-3 py-1  bg-white border-black text-secondary-foreground text-xs rounded-full hover:cursor-pointer hover:text-DarkOrange   hover:border-DarkOrange"
            >
              {category}
            </span>
          ))}
        </div>
        <CardTitle className="text-lg">{promptResource.fields?.Name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow -mt-2">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {promptResource.fields?.Description?.split("\n")[0]}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          onClick={() => handlePromptClick(promptResource)}
          className=" bg-DarkOrange hover:bg-DarkOrange/90 text-white font-semibold py-2 px-4 rounded-md hover:bg-white hover:text-DarkOrange border border-DarkOrange"
        >
          View Prompt
          <FiArrowUpRight className="text-2xl " />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptCard;
