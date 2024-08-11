export default interface AirtableModel {
  id: string;
  fields: {
    Tags: string;
    Stage: string;
    Name: string;
    WebsiteLink: string;
    Description: string;
    ToolImage: string;
    Verified :boolean;
    Pricing:string[];
  };
  totalLikes?:any
}



