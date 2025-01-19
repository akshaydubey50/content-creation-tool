import type { Metadata } from "next";
import ContactScreen from "@/components/contact-us/ContactScreen";

export const metadata: Metadata = {
  title: "Contact - Content Creation FYI",
  description: "Get in touch with Content Creation FYI (CCF) for inquiries, feedback, or support. We're here to help you with all your content creation needs."
};

export default function ContactUs() {
  return <ContactScreen />
}
