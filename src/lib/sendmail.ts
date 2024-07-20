import { ResendConf } from "@/conf/conf";
import { resend } from "@/helper/resend";
import VerificationEmail from "../../email/VerificationEmail";

interface Response {
  success: boolean;
  message: string;
}

export async function sendmail(
  email: string,
  verifyCode: string
): Promise<Response> {
  try {
    const resendSentMailResponse = await resend().emails.send({
      from: ResendConf.FROM,
      to: email,
      subject: "Content Creation Tool | Verification Code",
      react: VerificationEmail({ email, otp: verifyCode }),
    });
    console.log({ resendSentMailResponse });

    return {
      success: true,
      message: "Verification code sent to Email",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to send verification Email",
    };
  }
}
