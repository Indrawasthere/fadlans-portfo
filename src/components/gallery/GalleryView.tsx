"use client";

import { Button, Column, Flex, Heading, Icon, Text, Media, MasonryGrid } from "@once-ui-system/core";
import { gallery } from "@/resources";

export default function GalleryView() {
  const isPDF = gallery.images[0]?.src.endsWith('.pdf');

  if (isPDF) {
    return (
      <Flex fillWidth padding="xl" horizontal="center" vertical="center">
        <Column fillWidth maxWidth="m" gap="l" horizontal="center">
          <Icon name="download" size="xl" />
          <Heading as="h2" variant="heading-strong-l" align="center">
            {gallery.title}
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-medium" align="center">
            {gallery.description}
          </Text>
          <Button
            href={gallery.images[0].src}
            download
            variant="primary"
            size="l"
            label="Download Resume PDF"
            prefixIcon="download"
          />
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
