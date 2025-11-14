"use client";

import {
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  Text,
  Media,
  MasonryGrid,
} from "@once-ui-system/core";
import { gallery } from "@/resources";

export default function GalleryView() {
  const isPDF = gallery.images[0]?.src.endsWith(".pdf");

  /* =========================================
     PDF RESUME MODE
  ========================================= */
  if (isPDF) {
    return (
      <Flex
        fillWidth
        fillHeight
        style={{ minHeight: "calc(100vh - 180px)" }}
        paddingY="xl"
        horizontal="center"
        vertical="center"
      >
        <Column
          fillWidth
          maxWidth="m"
          paddingX="l"
          gap="32"
          horizontal="center"
          align="center"
        >
          <Heading
            className="neon-title"
            as="h1"
            variant="display-strong-xl"
            align="center"
            wrap="balance"
          >
            {gallery.title}
          </Heading>

          <Text
            className="neon-sub"
            variant="heading-default-l"
            onBackground="neutral-weak"
            align="center"
            wrap="balance"
          >
            {gallery.description}
          </Text>

          {/* Neon Border Download Button */}
          <Button
            href={gallery.images[0].src}
            download
            size="l"
            prefixIcon="download"
            className="resume-btn"
          >
            Grab my resume here
          </Button>

        </Column>
      </Flex>
    );
  }

  /* =========================================
     IMAGE GALLERY MODE
  ========================================= */
  return (
    <Column fillWidth paddingTop="xl" gap="xl">
      <MasonryGrid columns={2} s={{ columns: 1 }} gap="l">
        {gallery.images.map((image, index) => (
          <Media
            key={image.src}
            enlarge
            priority={index < 6}
            radius="l"
            sizes="(max-width: 560px) 100vw, 50vw"
            aspectRatio={
              image.orientation === "horizontal" ? "16 / 9" : "3 / 4"
            }
            src={image.src}
            alt={image.alt}
            className="gallery-media"
          />
        ))}
      </MasonryGrid>
    </Column>
  );
}
