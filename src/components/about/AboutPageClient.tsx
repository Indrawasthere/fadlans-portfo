"use client";

import React from "react";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Schema,
  Row,
  RevealFx,
  Line,
} from "@once-ui-system/core";
import { ScrollReveal } from "@/components/ScrollReveal";
import { baseURL, about, person, social } from "@/resources";
import styles from "@/components/about/about.module.scss";
import Image from "next/image";

// 3D Hover Media Wrapper Component
const Media3DCard: React.FC<{
  src: string;
  alt: string;
  width: string;
  height: string;
}> = ({ src, alt, width, height }) => {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotY = ((x - centerX) / rect.width) * 8;
    const rotX = ((centerY - y) / rect.height) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.25s ease-out",
          transformStyle: "preserve-3d",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Media
          enlarge
          radius="m"
          sizes={width}
          alt={alt}
          src={src}
          style={{
            width: "100%",
            height,
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

// Social Badge Component with neon colors
const SocialBadge: React.FC<{
  name: string;
  icon: string;
  link: string;
}> = ({ name, icon, link }) => {
  const getNeonColor = () => {
    switch (name.toLowerCase()) {
      case "github":
        return { color: "#4DF3FF", glow: "rgba(77,243,255,0.45)" };
      case "linkedin":
        return { color: "#B14CFF", glow: "rgba(177,76,255,0.45)" };
      case "email":
        return { color: "#FF44CC", glow: "rgba(255,68,204,0.45)" };
      default:
        return { color: "#4DF3FF", glow: "rgba(77,243,255,0.45)" };
    }
  };

  const { color, glow } = getNeonColor();
  const badgeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const badge = badgeRef.current?.querySelector("a") as HTMLElement;
    if (!badge) return;

    const handleMouseEnter = () => {
      badge.style.boxShadow = `0 0 24px ${glow}, inset 0 0 16px ${glow}30`;
      badge.style.transform = "scale(1.06)";
    };

    const handleMouseLeave = () => {
      badge.style.boxShadow = `0 0 12px ${glow}, inset 0 0 12px ${glow}20`;
      badge.style.transform = "scale(1)";
    };

    badge.addEventListener("mouseenter", handleMouseEnter);
    badge.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      badge.removeEventListener("mouseenter", handleMouseEnter);
      badge.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [glow]);

  return (
    <div ref={badgeRef}>
      <Button
        href={link}
        prefixIcon={icon}
        label={name}
        size="s"
        variant="secondary"
        style={{
          minWidth: "fit-content",
          maxWidth: "fit-content",
          border: `1px solid ${color}`,
          boxShadow: `0 0 12px ${glow}, inset 0 0 12px ${glow}20`,
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default function AboutPageClient() {
  return (
    <>
      <Column
        fillWidth
        maxWidth="l"
        className="relative"
        style={{ zIndex: 1, paddingTop: "40px", paddingBottom: "80px" }}
      >
        <Schema
          as="webPage"
          baseURL={baseURL}
          title={about.title}
          description={about.description}
          path={about.path}
          image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />

        {/* MAIN NEON GLASS CARD CONTAINER */}
        <RevealFx translateY="16" delay={0.1}>
          <Column
            fillWidth
            padding="xl"
            className="energy-pulse"
            style={{
              borderRadius: "32",
              border: "1px solid rgba(0,255,255,0.25)",
              background: "rgba(10,10,20,0.45)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 0 30px rgba(0,255,255,0.25)",
            }}
            s={{
              padding: "l",
            }}
          >
            {/* ===== TOP HERO SECTION ===== */}
            <Row
              fillWidth
              gap="48"
              horizontal="start"
              s={{
                direction: "column",
                gap: "32",
              }}
            >
              {/* LEFT: Avatar + Location + Languages */}
              {about.avatar.display && (
                <ScrollReveal translateY={16} delay={0.15}>
                  <Column
                    minWidth={280}
                    maxWidth={280}
                    gap="24"
                    style={{
                      minWidth: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    {/* Pure Avatar - High Resolution */}
                    <div
                      style={{
                        width: "180px",
                        height: "180px",
                        borderRadius: "999px",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={person.avatar}
                        alt={person.name}
                        width={180}
                        height={180}
                        priority
                        quality={95}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>

                    {/* Location */}
                    <Column gap="12">
                      <Row gap="8" vertical="center">
                        <Icon size="s" onBackground="accent-weak" name="globe" />
                        <Text variant="body-default-s">
                          {person.location}
                        </Text>
                      </Row>

                      {/* Languages */}
                      {person.languages && person.languages.length > 0 && (
                        <Row wrap gap="8">
                          {person.languages.map((language, index) => (
                            <Tag
                              key={index}
                              size="s"
                              style={{
                                border: "1px solid rgba(77,243,255,0.5)",
                                backgroundColor: "rgba(77,243,255,0.08)",
                                padding: "4px 12px",
                                fontSize: "12px",
                              }}
                            >
                              {language}
                            </Tag>
                          ))}
                        </Row>
                      )}
                    </Column>
                  </Column>
                </ScrollReveal>
              )}

              {/* RIGHT: Name, Title, Calendar, Social, Intro */}
              <Column
                flex={9}
                gap="l"
                s={{
                  maxWidth: "100%",
                }}
              >
                <ScrollReveal translateY={16} delay={0.2}>
                  <Column
                    fillWidth
                    gap="16"
                    style={{
                      alignItems: "flex-start",
                      textAlign: "left",
                    }}
                    s={{
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {/* Calendar Button */}
                    {about.calendar.display && (
                      <Row
                        fitWidth
                        border="brand-alpha-medium"
                        background="brand-alpha-weak"
                        radius="full"
                        padding="4"
                        gap="8"
                        marginBottom="m"
                        vertical="center"
                        style={{
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                        <Row paddingX="8">Schedule a call</Row>
                        <IconButton
                          href={about.calendar.link}
                          data-border="rounded"
                          variant="secondary"
                          icon="chevronRight"
                        />
                      </Row>
                    )}

                    {/* NAME */}
                    <Heading
                      className="neon-title"
                      variant="display-strong-xl"
                      style={{
                        lineHeight: "1.1",
                      }}
                    >
                      {person.name}
                    </Heading>

                    {/* ROLE */}
                    <Text
                      variant="heading-default-l"
                      onBackground="neutral-weak"
                      style={{
                        marginTop: "-4px",
                      }}
                    >
                      {person.role}
                    </Text>

                    {/* Social Badges with neon colors */}
                    {social.length > 0 && (
                      <Row
                        paddingTop="16"
                        gap="12"
                        wrap
                        horizontal="start"
                        s={{
                          horizontal: "center",
                        }}
                      >
                        {social.map(
                          (item) =>
                            item.link && (
                              <SocialBadge
                                key={item.name}
                                name={item.name}
                                icon={item.icon}
                                link={item.link}
                              />
                            ),
                        )}
                      </Row>
                    )}
                  </Column>
                </ScrollReveal>

                {/* INTRO TEXT */}
                {about.intro.display && (
                  <ScrollReveal translateY={16} delay={0.25}>
                    <Column textVariant="body-default-l" fillWidth gap="m">
                      {about.intro.description}
                    </Column>
                  </ScrollReveal>
                )}
              </Column>
            </Row>

            {/* NEON DIVIDER LINE */}
            <Row fillWidth horizontal="center" marginTop="xl" marginBottom="xl">
              <Line
                style={{
                  maxWidth:"100%",
                  background: "rgba(0,255,255,0.25)",
                  boxShadow: "0 0 10px rgba(0,255,255,0.5)",
                }}
              />
            </Row>

            {/* ===== WORK EXPERIENCE SECTION ===== */}
            {about.work.display && (
              <ScrollReveal translateY={16} delay={0.3}>
                <Column fillWidth gap="l" marginBottom="xl">
                  <Heading
                    className="neon-title"
                    as="h2"
                    id={about.work.title}
                    variant="heading-strong-l"
                    marginBottom="24"
                  >
                    {about.work.title}
                  </Heading>

                  <Column
                    fillWidth
                    gap="xl"
                    style={{
                      borderLeft: "2px solid rgba(0,200,255,0.25)",
                      paddingLeft: "24px",
                    }}
                  >
                    {about.work.experiences.map((experience, index) => (
                      <ScrollReveal
                        key={`${experience.company}-${experience.role}-${index}`}
                        translateY={16}
                        delay={index * 0.1}
                      >
                        <Column
                          fillWidth
                          gap="12"
                          style={{
                            position: "relative",
                            paddingBottom: "16px",
                          }}
                        >
                          {/* Neon dot on timeline */}
                          <div
                            style={{
                              width: "14px",
                              height: "14px",
                              borderRadius: "50%",
                              background: "#00eaff",
                              position: "absolute",
                              left: "-31px",
                              top: "4px",
                              boxShadow: "0 0 14px #00eaff",
                            }}
                          />

                          {/* Company & Timeframe */}
                          <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                            <Text variant="heading-strong-m">{experience.company}</Text>
                            <Text variant="heading-default-xs" onBackground="neutral-weak">
                              {experience.timeframe}
                            </Text>
                          </Row>

                          {/* Role */}
                          <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                            {experience.role}
                          </Text>

                          {/* Achievements */}
                          <Column as="ul" gap="12" marginBottom="l">
                            {experience.achievements.map(
                              (achievement: React.ReactNode, idx: number) => (
                                <Text
                                  as="li"
                                  variant="body-default-m"
                                  key={`${experience.company}-${idx}`}
                                  style={{
                                    wordBreak: "break-word",
                                    overflow: "hidden",
                                  }}
                                >
                                  {achievement}
                                </Text>
                              ),
                            )}
                          </Column>

                          {/* Optional Images */}
                          {experience.images && experience.images.length > 0 && (
                            <Row
                              fillWidth
                              paddingTop="m"
                              paddingLeft="40"
                              gap="12"
                              wrap
                              horizontal="start"
                            >
                              {experience.images.map((image, imgIndex) => (
                                <Column
                                  key={imgIndex}
                                  style={{
                                    minWidth: "300px",
                                    maxWidth: "300px",
                                    flexShrink: 0,
                                  }}
                                >
                                  <Media3DCard
                                    src={image.src}
                                    alt={image.alt}
                                    width="100%"
                                    height="auto"
                                  />
                                </Column>
                              ))}
                            </Row>
                          )}
                        </Column>
                      </ScrollReveal>
                    ))}
                  </Column>
                </Column>
              </ScrollReveal>
            )}

            {/* ===== TECHNICAL SKILLS SECTION ===== */}
            {about.technical.display && (
              <ScrollReveal translateY={16} delay={0.4}>
                <Column fillWidth gap="l">
                  <Heading
                    className="neon-title"
                    as="h2"
                    id={about.technical.title}
                    variant="heading-strong-l"
                    marginBottom="24"
                  >
                    {about.technical.title}
                  </Heading>

                  <Column fillWidth gap="l">
                    {about.technical.skills.map((skill, index) => (
                      <ScrollReveal
                        key={`${skill.title}-${index}`}
                        translateY={16}
                        delay={index * 0.1}
                      >
                        <Column
                          fillWidth
                          gap="12"
                          padding="l"
                          radius="m"
                          style={{
                            border: "1px solid rgba(0,200,255,0.15)",
                            background: "rgba(0,200,255,0.05)",
                          }}
                        >
                          {/* Skill Title & Badges Row */}
                          <Row
                            fillWidth
                            horizontal="between"
                            vertical="start"
                            gap="16"
                            s={{
                              direction: "column",
                            }}
                          >
                            <Heading as="h3" variant="heading-strong-m" style={{ flex: 1 }}>
                              {skill.title}
                            </Heading>

                            {/* Badges */}
                            {skill.tags && skill.tags.length > 0 && (
                              <Row wrap gap="8">
                                {skill.tags.map((tag, tagIndex) => (
                                  <Tag
                                    key={`${skill.title}-${tagIndex}`}
                                    size="l"
                                    prefixIcon={tag.icon}
                                    style={{
                                      border: "1px solid rgba(77,243,255,0.6)",
                                      boxShadow: "0 0 10px rgba(77,243,255,0.35)",
                                      transition: "all 0.3s ease",
                                      cursor: "pointer",
                                    }}
                                    onMouseEnter={(e) => {
                                      const target = e.currentTarget as HTMLDivElement;
                                      target.style.boxShadow = "0 0 20px rgba(77,243,255,0.6)";
                                      target.style.transform = "scale(1.05)";
                                    }}
                                    onMouseLeave={(e) => {
                                      const target = e.currentTarget as HTMLDivElement;
                                      target.style.boxShadow = "0 0 10px rgba(77,243,255,0.35)";
                                      target.style.transform = "scale(1)";
                                    }}
                                  >
                                    {tag.name}
                                  </Tag>
                                ))}
                              </Row>
                            )}
                          </Row>

                          {/* Description */}
                          <Text
                            variant="body-default-m"
                            onBackground="neutral-weak"
                            style={{
                              wordBreak: "break-word",
                              overflow: "hidden",
                            }}
                          >
                            {skill.description}
                          </Text>

                          {/* Optional Images */}
                          {skill.images && skill.images.length > 0 && (
                            <Row fillWidth gap="16" horizontal="start" wrap paddingTop="m">
                              {skill.images.map((image, imgIndex) => (
                                <Column
                                  key={imgIndex}
                                  style={{
                                    maxWidth: "300px",
                                    minWidth: "300px",
                                    flexShrink: 0,
                                  }}
                                >
                                  <Media3DCard
                                    src={image.src}
                                    alt={image.alt}
                                    width="100%"
                                    height="auto"
                                  />
                                </Column>
                              ))}
                            </Row>
                          )}
                        </Column>
                      </ScrollReveal>
                    ))}
                  </Column>
                </Column>
              </ScrollReveal>
            )}
          </Column>
        </RevealFx>

        {/* Neon Pulse Animation */}
        <style>{`
          @keyframes neonPulse {
            0%, 100% {
              box-shadow: 0 0 18px rgba(77,243,255,0.45);
            }
            50% {
              box-shadow: 0 0 32px rgba(77,243,255,0.7), 0 0 48px rgba(177,76,255,0.5);
            }
          }
        `}</style>
      </Column>
    </>
  );
}
