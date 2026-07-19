import type { Metadata } from "next";
import ProfileLayout from "@/components/ProfileLayout";
import { girish } from "@/lib/founders";

export const metadata: Metadata = {
  title: "Girish Kumar — SACHI",
  description:
    "Girish Kumar, co-founder of SACHI. Entrepreneur, brand strategist and storyteller — founder of Chitti.",
};

export default function GirishPage() {
  return <ProfileLayout founder={girish} other={{ name: "Sahith", href: "/sahith" }} />;
}
