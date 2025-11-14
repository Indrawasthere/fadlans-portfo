"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import useParallax from "@/hooks/useParallax";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  cardClass?: string; // custom class (neon-border, neon-card, dll)
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  cardClass,
}) => {
  const parallaxRef = useParallax(14); // strength tilt

  return (
    <div
      ref={parallaxRef}
      className={`parallax-card energy-pulse ${cardClass || ""}`}
      style={{
        borderRadius: "22px",
      }}
    >
      <Column fillWidth gap="m" style={{ borderRadius: "inherit", overflow: "hidden" }}>
        
        {/* Carousel */}
        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          items={images.map((image) => ({
            slide: image,
            alt: title,
          }))}
          style={{
            borderRadius: "inherit",
          }}
        />

        {/* Content */}
        <Flex
          s={{ direction: "column" }}
          fillWidth
          paddingX="s"
          paddingTop="12"
          paddingBottom="24"
          gap="l"
          style={{
            borderRadius: "inherit",
          }}
        >
          {/* Title */}
          {title && (
            <Flex flex={5}>
              <Heading
                as="h2"
                wrap="balance"
                variant="heading-strong-xl"
              >
                {title}
              </Heading>
            </Flex>
          )}

          {/* Content Body */}
          {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
            <Column flex={7} gap="16">
              
              {/* Avatar Group */}
              {avatars?.length > 0 && (
                <AvatarGroup avatars={avatars} size="m" reverse />
              )}

              {/* Description */}
              {description?.trim() && (
                <Text
                  wrap="balance"
                  variant="body-default-s"
                  onBackground="neutral-weak"
                >
                  {description}
                </Text>
              )}

              {/* Action links */}
              <Flex gap="24" wrap>
                {content?.trim() && (
                  <SmartLink
                    suffixIcon="arrowRight"
                    style={{ margin: 0, width: "fit-content" }}
                    href={href}
                  >
                    <Text variant="body-default-s">Read case study</Text>
                  </SmartLink>
                )}

                {link && (
                  <SmartLink
                    suffixIcon="arrowUpRightFromSquare"
                    style={{ margin: 0, width: "fit-content" }}
                    href={link}
                  >
                    <Text variant="body-default-s">View project</Text>
                  </SmartLink>
                )}
              </Flex>

            </Column>
          )}
        </Flex>
      </Column>
    </div>
  );
};
