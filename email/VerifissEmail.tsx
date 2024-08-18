import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  email: string;
  otp: string;
  isUrl: boolean;
}

export default function VerifissEmail({
  email,
  otp,
  isUrl = false,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">
            Hello
            {/* {email}, */}
          </Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </Text>
        </Row>

        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
        {isUrl ? (
          <Row>
            <Button href={otp} style={{ color: "#61dafb" }}>
              Verify here
            </Button>
          </Row>
        ) : (
          <Row>
            <Text>{otp}</Text>
          </Row>
        )}
        {isUrl && (
          <Row>
            <Text>Or you can copy paste this link in your browser</Text>
            <br />
            <Text>{otp}</Text>
          </Row>
        )}
      </Section>
    </Html>
  );
}
