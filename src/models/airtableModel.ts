export default interface AirtableModel {
  id: string;
  fields: {
    Tags: string;
    Price: string;
    Status: string;
    Name: string;
    WebsiteLink: string;
    Description: string;
    ToolImage:{
      url:ImageUrl[];
    }
  };
}

interface ImageUrl {
  url:string
}
