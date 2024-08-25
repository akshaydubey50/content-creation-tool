import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
  userFirstname: string;
  resetPasswordLink: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ResetPasswordEmail = ({
  userFirstname,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      {/* <Preview>Dropbox reset your password</Preview> */}
      <Body style={main}>
        <Container style={container}>
          {/* <Img
            src={`${baseUrl}/static/dropbox-logo.png`}
            width="40"
            height="33"
            alt="Dropbox"
          /> */}
          <Section>
            <Text style={text}>Hi {userFirstname} 👋,</Text>
            <Text style={text}>
              No worries—we’ve all been there. Let’s get you back on track!

            </Text>
            <Text style={textBold}>
              Click the button below to reset your password:
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Reset My Password
            </Button>
            <Text style={text}>
              For your security, this link will expire in 10 minutes. 
            </Text>
            <Text style={text}>
              Need help? Just reply to this email, and we’ll assist you right away.
            </Text>
            <Text style={footer}>
              Stay creative!
              <br />
              Arpit Singh
              <br />
              CCF Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ResetPasswordEmail.PreviewProps = {
  userFirstname: "",
  resetPasswordLink: "",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "500",
  color: "#404040",
  lineHeight: "26px",
};
const textBold={
  ...text,
  fontWeight:700
}


const button = {
  fontWeight: "700",
  backgroundColor: "#FF8C00",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};

const footer = {
  color: "#8898aa",
  fontSize: "16px",
};
