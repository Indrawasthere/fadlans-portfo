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
  Meta,
  Schema,
  Row,
  RevealFx,
  Line,
} from "@once-ui-system/core";
import { ScrollReveal } from "@/components/ScrollReveal";
import { baseURL, about, person, social } from "@/resources";
import styles from "@/components/about/about.module.scss";

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
  return (
    <>
      <Column
        fillWidth
        maxWidth="xl"
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
            radius="32"
            className="energy-pulse"
            style={{
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
                    minWidth="240"
                    maxWidth="240"
                    gap="l"
                    s={{
                      minWidth: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    <Avatar src={person.avatar} size="xl" />
                    <Row gap="8" vertical="center">
                      <Icon onBackground="accent-weak" name="globe" />
                      <Text variant="body-default-s">{person.location}</Text>
                    </Row>
                    {person.languages && person.languages.length > 0 && (
                      <Row wrap gap="8">
                        {person.languages.map((language, index) => (
                          <Tag key={index} size="l" className="neon-border">
                            {language}
                          </Tag>
                        ))}
                      </Row>
                    )}
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
                        <Icon
                          paddingLeft="12"
                          name="calendar"
                          onBackground="brand-weak"
                        />
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

                    {/* Social Buttons */}
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
                              <Button
                                key={item.name}
                                href={item.link}
                                prefixIcon={item.icon}
                                label={item.name}
                                size="s"
                                variant="secondary"
                                className="neon-border"
                                style={{
                                  minWidth: "fit-content",
                                }}
                              />
                            )
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
            <Row
              fillWidth
              horizontal="center"
              marginTop="xl"
              marginBottom="xl"
            >
              <Line
                maxWidth="100%"
                style={{
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
                          <Row
                            fillWidth
                            horizontal="between"
                            vertical="end"
                            marginBottom="4"
                          >
                            <Text variant="heading-strong-m">
                              {experience.company}
                            </Text>
                            <Text
                              variant="heading-default-xs"
                              onBackground="neutral-weak"
                            >
                              {experience.timeframe}
                            </Text>
                          </Row>

                          {/* Role */}
                          <Text
                            variant="body-default-s"
                            onBackground="brand-weak"
                            marginBottom="m"
                          >
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
                                >
                                  {achievement}
                                </Text>
                              )
                            )}
                          </Column>

                          {/* Optional Images */}
                          {experience.images &&
                            experience.images.length > 0 && (
                              <Row
                                fillWidth
                                paddingTop="m"
                                paddingLeft="40"
                                gap="12"
                                wrap
                              >
                                {experience.images.map((image, imgIndex) => (
                                  <Row
                                    key={imgIndex}
                                    border="neutral-medium"
                                    radius="m"
                                    minWidth={image.width}
                                    height={image.height}
                                    zIndex={10}
                                  >
                                    <Media
                                      enlarge
                                      radius="m"
                                      sizes={image.width.toString()}
                                      alt={image.alt}
                                      src={image.src}
                                    />
                                  </Row>
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
                            <Heading
                              as="h3"
                              variant="heading-strong-m"
                              style={{ flex: 1 }}
                            >
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
                                    className="neon-border"
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
                          >
                            {skill.description}
                          </Text>

                          {/* Optional Images */}
                          {skill.images && skill.images.length > 0 && (
                            <Row
                              fillWidth
                              gap="16"
                              horizontal="start"
                              wrap
                              paddingTop="m"
                            >
                              {skill.images.map((image, imgIndex) => (
                                <Row
                                  key={imgIndex}
                                  border="neutral-medium"
                                  radius="m"
                                  minWidth={image.width}
                                  height={image.height}
                                  zIndex={10}
                                >
                                  <Media
                                    enlarge
                                    radius="m"
                                    sizes={image.width.toString()}
                                    alt={image.alt}
                                    src={image.src}
                                  />
                                </Row>
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

            {/* ===== STUDIES SECTION ===== */}
            {about.studies.display && (
              <ScrollReveal translateY={16} delay={0.5}>
                <Column fillWidth gap="l" marginTop="xl">
                  <Heading
                    className="neon-title"
                    as="h2"
                    id={about.studies.title}
                    variant="heading-strong-l"
                    marginBottom="24"
                  >
                    {about.studies.title}
                  </Heading>

                  <Column fillWidth gap="l">
                    {about.studies.institutions.map((institution, index) => (
                      <ScrollReveal
                        key={`${institution.name}-${index}`}
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
                          {/* Institution Name & Timeframe */}
                          <Row
                            fillWidth
                            horizontal="between"
                            vertical="end"
                          >
                            <Heading
                              as="h3"
                              variant="heading-strong-m"
                              id={institution.name}
                            >
                              {institution.name}
                            </Heading>
                            {institution.timeframe && (
                              <Text
                                variant="heading-default-xs"
                                onBackground="neutral-weak"
                              >
                                {institution.timeframe}
                              </Text>
                            )}
                          </Row>

                          {/* Description */}
                          <Text
                            variant="body-default-m"
                            onBackground="neutral-weak"
                          >
                            {institution.description}
                          </Text>

                          {/* Optional Images */}
                          {institution.images &&
                            institution.images.length > 0 && (
                              <Row
                                fillWidth
                                paddingTop="m"
                                gap="12"
                                wrap
                              >
                                {institution.images.map((image, imgIndex) => (
                                  <Row
                                    key={imgIndex}
                                    border="neutral-medium"
                                    radius="m"
                                    minWidth={image.width}
                                    height={image.height}
                                    zIndex={10}
                                  >
                                    <Media
                                      enlarge
                                      radius="m"
                                      sizes={image.width.toString()}
                                      alt={image.alt}
                                      src={image.src}
                                    />
                                  </Row>
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
      </Column>
    </>
  );
}