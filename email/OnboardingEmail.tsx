import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OnboardingEmailProps {
  userFirstname: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const OnboardingEmail = ({ userFirstname }: OnboardingEmailProps) => (
  <Html>
    <Head />
   
    <Body style={main}>
      <Container style={container}>
      
        <Text style={paragraph}>Hi {userFirstname} 👋,</Text>
        <Text style={paragraph}>
          Thanks for joining ContentCreation.fyi!
        </Text>
        <Section style={btnContainer}>
          <Text style={paragraph}>
            You&apos;ve just joined a community of creators, writers, marketers, and founders who are all about taking content creation to the next level.
          </Text>
          <Text style={paragraph}>
            Here&apos;s what you can do now:
          </Text>
          <Text style={unOrderList}>
            <span style={spanText}>Explore</span>: Dive into our directory of 200+ content creation tools.
            <span style={spanText}>Filter</span>: Easily find tools based on category & pricing model.
            <span style={spanText}>Bookmark</span>: Keep track of your favourite tools.
            <span style={spanText}>Like</span>: Give a thumbs up to tools you love.
            Go to the directory(button)
          </Text>
        </Section>
        <Button style={button} href="https://getkoala.com">
          Go to the directory
        </Button>
        <Text style={paragraph}>
          Need help getting started?
          <br />
          Just reply to this email—we&apos;re here for you.
        </Text>
        <Text style={footer}>
          Stay creative!
          <br />
          Arpit Singh
          <br />
        </Text>
      </Container>
    </Body>
  </Html>
);

OnboardingEmail.PreviewProps = {
  userFirstname: "",
} as OnboardingEmailProps;

export default OnboardingEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};

const spanText = {
  fontWeight: 700,
}
const unOrderList = {
  listStyleType: "disc"
}