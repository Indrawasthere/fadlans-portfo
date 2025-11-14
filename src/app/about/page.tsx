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
} from "@once-ui-system/core";
import { ScrollReveal } from "@/components/ScrollReveal";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
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
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];

  return (
    <>
      <Column
        fillWidth
        maxWidth="2xl"
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
        <RevealFx translateY="16" delay={0.2}>
          {about.tableOfContent.display && (
            <Column
              left="0"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              position="fixed"
              paddingLeft="24"
              gap="32"
              zIndex={-1}
              s={{ hide: true }}
            >
              <TableOfContents structure={structure} about={about} />
            </Column>
          )}
          <Row fillWidth gap="48" horizontal="start" s={{ direction: "column", gap: "32" }}>
            {about.avatar.display && (
              <Column
                minWidth="300"
                maxWidth="300"
                gap="l"
                className="neon-card"
                style={{
                  padding: "24px",
                  borderRadius: "20px",
                  background: "rgba(20,20,30,0.4)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(80,200,255,0.25)",
                  boxShadow: "0 0 25px rgba(0,180,255,0.25)",
                }}
                s={{
                  minWidth: "100%",
                  maxWidth: "100%",
                }}
              >
                <Avatar src={person.avatar} size="xl" />
                <Row gap="8" vertical="center">
                  <Icon onBackground="accent-weak" name="globe" />
                  {person.location}
                </Row>
                {person.languages && person.languages.length > 0 && (
                  <Row wrap gap="8">
                    {person.languages.map((language, index) => (
                      <Tag key={index} size="l">
                        {language}
                      </Tag>
                    ))}
                  </Row>
                )}
              </Column>
            )}
            <Column
              className={styles.blockAlign}
              flex={9}
              gap="l"
              style={{
                maxWidth: "100%",
              }}
            >
              <ScrollReveal translateY={16} delay={0.1}>
                <Column
                  id={about.intro.title}
                  fillWidth
                  gap="16"
                  marginBottom="40"
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
                      style={{
                        justifyContent: "flex-start",
                      }}
                      s={{
                        justifyContent: "center",
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
            </Column>


              {about.intro.display && (
                <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                  {about.intro.description}
                </Column>
              )}

              {about.work.display && (
                <ScrollReveal translateY={16} delay={0.2}>
                  <Column gap="l" marginTop="xl">
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
                            gap="12"
                            style={{
                              position: "relative",
                              paddingBottom: "16px",
                            }}
                          >
                            {/* neon dot */}
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

                            <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                              <Text variant="heading-strong-m">{experience.company}</Text>

                              <Text variant="heading-default-xs" onBackground="neutral-weak">
                                {experience.timeframe}
                              </Text>
                            </Row>

                            <Text
                              variant="body-default-s"
                              onBackground="brand-weak"
                              marginBottom="m"
                            >
                              {experience.role}
                            </Text>

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
                                ),
                              )}
                            </Column>

                            {/* Optional images */}
                            {experience.images && experience.images.length > 0 && (
                              <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
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

              {about.studies.display && (
                <ScrollReveal translateY={16} delay={0.3}>
                  <Heading
                    className={`${styles.textAlign} neon-title`}
                    as="h2"
                    id={about.studies.title}
                    variant="heading-strong-xl"
                    marginBottom="40"
                  >
                    {about.studies.title}
                  </Heading>
                  <Column fillWidth gap="l" marginBottom="40">
                    {about.studies.institutions.map((institution, index) => (
                      <ScrollReveal
                        key={`${institution.name}-${index}`}
                        translateY={16}
                        delay={index * 0.1}
                      >
                        <Column fillWidth>
                          <Row fillWidth horizontal="between" vertical="end" marginBottom="m">
                            <Text id={institution.name} variant="heading-strong-m">
                              {institution.name}
                            </Text>
                            {institution.timeframe && (
                              <Text variant="heading-default-xs" onBackground="neutral-weak">
                                {institution.timeframe}
                              </Text>
                            )}
                          </Row>
                          <Column marginBottom="l">
                            <Text variant="body-default-m" onBackground="neutral-weak">
                              {institution.description}
                            </Text>
                          </Column>
                          {institution.images && institution.images.length > 0 && (
                            <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                              {institution.images.map((image, index) => (
                                <Row
                                  key={index}
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
                </ScrollReveal>
              )}

              {about.technical.display && (
                <ScrollReveal translateY={16} delay={0.4}>
                  <Heading
                    className={`${styles.textAlign} neon-title`}
                    as="h2"
                    id={about.technical.title}
                    variant="heading-strong-xl"
                    marginBottom="40"
                  >
                    {about.technical.title}
                  </Heading>
                  <Column fillWidth gap="l">
                    {about.technical.skills.map((skill, index) => (
                      <ScrollReveal key={`${skill}-${index}`} translateY={16} delay={index * 0.1}>
                        <Column fillWidth gap="4">
                          <Text id={skill.title} variant="heading-strong-m">
                            {skill.title}
                          </Text>
                          <Text variant="body-default-m" onBackground="neutral-weak">
                            {skill.description}
                          </Text>
                          {skill.tags && skill.tags.length > 0 && (
                            <Row wrap gap="8" paddingTop="8">
                              {skill.tags.map((tag, tagIndex) => (
                                <Tag
                                  key={`${skill.title}-${tagIndex}`}
                                  size="l"
                                  prefixIcon={tag.icon}
                                >
                                  {tag.name}
                                </Tag>
                              ))}
                            </Row>
                          )}
                          {skill.images && skill.images.length > 0 && (
                            <Row
                              fillWidth
                              gap="48"
                              horizontal="start"
                              s={{ direction: "column", gap: "32" }}
                            >
                              {skill.images.map((image, index) => (
                                <Row
                                  key={index}
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
                </ScrollReveal>
              )}
          </Row>
        </RevealFx>
      </Column>
    </>
  );
}
