"use client";

import { Button, Column, Flex, Heading, Icon, Text, Media, MasonryGrid } from "@once-ui-system/core";
import { gallery } from "@/resources";
import { styles } from "@/components/styles/neon-style";

export default function GalleryView() {
  const isPDF = gallery.images[0]?.src.endsWith('.pdf');

  if (isPDF) {
    return (
      <Flex 
        fillWidth 
        fillHeight
        style={{ minHeight: "calc(100vh - 200px)" }}
        paddingY="xl" 
        horizontal="center" 
        vertical="center"
      >
        <Column 
          fillWidth 
          maxWidth="s" 
          gap="40" 
          horizontal="center"
          align="center"
          paddingX="l"
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
          <Button
            href={gallery.images[0].src}
            download
            variant="primary"
            size="l"
            prefixIcon="download"
          >
            Download Resume PDF
          </Button>
        </Column>
      </Flex>
    );
  }

  // Fallback to original image gallery if not PDF
  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {gallery.images.map((image, index) => (
        <Media
          enlarge
          priority={index < 10}
          sizes="(max-width: 560px) 100vw, 50vw"
          key={index}
          radius="m"
          aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
          src={image.src}
          alt={image.alt}
        />
      ))}
    </MasonryGrid>
  );
}