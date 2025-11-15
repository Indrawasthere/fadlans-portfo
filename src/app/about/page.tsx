import { Meta } from "@once-ui-system/core";
import { baseURL, about } from "@/resources";
import AboutPageClient from "@/components/about/AboutPageClient";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  return <AboutPageClient />;
}