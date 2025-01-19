export interface AirtableModel {
  id: string;
  fields: {
    Tags: string[];
    Stage: string;
    Name: string;
    WebsiteLink: string;
    Description: string;
    ToolImage: string;
    Verified: boolean;
    Pricing: string;
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

export interface ExpertModel {
  id: string;
  fields: {
    "Username": string;
    "Skills": string[];
    "First Name": string;
    "Country": string;
    "Email": string;
    "ExpertType": string[];
    "Industry": string[];
    "Last Name": string;
    "Twitter": string;
    "LinkedIn": string;
    "Professinal Bio": string;
    "Portfolio": string;
    "Instagram": string;
    "Status": string;
    "Tools": string;
    "Platforms": string[];
  };
}

export interface ProjectModel {
  id: string;
  fields: {
    "Project Title": string;
    Status: string,
    Category: string[];
    Budget: string;
    Deadline: string,
    "Project Description": string;
    ProjectType: string;
    ProjectURL: string;
  };
}

export interface JobModel {
  id: string;
  fields: {
    "Job_Title"?: string;
    "Company_LogoURL"?: string; 
    "CompanyName"?: string;
    "Location"?: string;
    "ApplyLink"?: string;
    "Salary"?: string;
    "JobType"?: string;
    "Status"?: string;
  };
}

