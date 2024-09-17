export interface AirtableModel {
  id: string;
  fields: {
    Tags: string[];
    Stage: string;
    Name: string;
    WebsiteLink: string;
    Description: string;
    ToolImage: string;
    Verified :boolean;
    Pricing:string;
    "Detailed Description"?: string; 
  };
  totalLikes?: any;
}

export interface PropmtResourceModel {
  id: string;
  fields: {
    Name: string;
    Description: string;
    Category: string[];
    Tags: string[];
    Status: string;
    Source: string;
    SourceLink: string;
  };
}

export interface ResourceModel {
  id: string;
  fields: {
    Name?: string;
    Description?: string;
    Topics?: string[];
    Tags?: string;
    URL?: string;
    "Author/Publisher/Admin/Creator"?: string;
  };
}

