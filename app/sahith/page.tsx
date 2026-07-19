import type { Metadata } from "next";
import ProfileLayout from "@/components/ProfileLayout";
import { sahith } from "@/lib/founders";

export const metadata: Metadata = {
  title: "Sahith Agraharapu — SACHI",
  description:
    "Sahith Agraharapu, co-founder of SACHI. Entrepreneur, growth strategist and brand storyteller — founder of Red Culture.",
};

export default function SahithPage() {
  return <ProfileLayout founder={sahith} other={{ name: "Girish", href: "/girish" }} />;
}
