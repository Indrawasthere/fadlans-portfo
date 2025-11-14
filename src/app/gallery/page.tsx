import { Column, Meta, Schema } from "@once-ui-system/core";
import { ScrollReveal } from "@/components/ScrollReveal";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}

export default function Gallery() {
  return (
    <>
      <Column fillWidth className="relative" style={{ zIndex: 1 }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column 
        fillWidth 
        paddingX="xl" 
        maxWidth="l" 
        style={{ margin: "0 auto" }}
        paddingTop="24"
      >
        <ScrollReveal translateY={16} delay={0.2}>
          <GalleryView />
        </ScrollReveal>
      </Column>
      </Column>
    </>
  );
}
