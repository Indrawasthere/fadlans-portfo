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
import NeonParticles from "@/components/NeonParticles";

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
      <NeonParticles />
      <Column fillWidth maxWidth="m" className="relative" style={{ zIndex: 1 }}>
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
          <Row fillWidth s={{ direction: "column" }} horizontal="center">
            {about.avatar.display && (
              <Column
                className={styles.avatar}
                fitHeight
                s={{ position: "relative", style: { top: "auto" } }}
                xs={{ style: { top: "auto" } }}
                minWidth="160"
                paddingX="l"
                paddingBottom="xl"
                gap="m"
                flex={3}
                horizontal="center"
                zIndex={-1}
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
            <Column className={styles.blockAlign} flex={9} maxWidth={40}>
              <ScrollReveal translateY={16} delay={0.1}>
                <Column
                  id={about.intro.title}
                  fillWidth
                  minHeight="160"
                  vertical="center"
                  marginBottom="32"
                >
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
                      className={styles.blockAlign}
                      style={{
                        backdropFilter: "blur(var(--static-space-1))",
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
                  <Heading
                    className={`${styles.textAlign} neon-title`}
                    variant="display-strong-xl"
                  >
                    {person.name}
                  </Heading>
                  <Text
                    className={styles.textAlign}
                    variant="display-default-xs"
                    onBackground="neutral-weak"
                  >
                    {person.role}
                  </Text>
                  {social.length > 0 && (
                    <Row
                      className={`${styles.blockAlign} neon-title`}
                      paddingTop="20"
                      paddingBottom="8"
                      gap="8"
                      wrap
                      horizontal="center"
                      fitWidth
                      data-border="rounded"
                    >
                      {social.map(
                        (item) =>
                          item.link && (
                            <React.Fragment key={item.name}>
                              <Row s={{ hide: true }}>
                                <Button
                                  className={`${styles.textAlign} neon-title`}
                                  key={item.name}
                                  href={item.link}
                                  prefixIcon={item.icon}
                                  label={item.name}
                                  size="s"
                                  weight="default"
                                  variant="secondary"
                                />
                              </Row>
                              <Row hide s={{ hide: false }}>
                                <IconButton
                                  size="l"
                                  key={`${item.name}-icon`}
                                  href={item.link}
                                  icon={item.icon}
                                  variant="secondary"
                                />
                              </Row>
                            </React.Fragment>
                          )
                      )}
                    </Row>
                  )}
                </Column>
              </ScrollReveal>

              {about.intro.display && (
                <Column
                  textVariant="body-default-l"
                  fillWidth
                  gap="m"
                  marginBottom="xl"
                >
                  {about.intro.description}
                </Column>
              )}

              {about.work.display && (
                <ScrollReveal translateY={16} delay={0.2}>
                  <Heading
                    className={`${styles.textAlign} neon-title`}
                    as="h2"
                    id={about.work.title}
                    variant="heading-strong-xl"
                    marginBottom="40"
                  >
                    {about.work.title}
                  </Heading>
                  <Column fillWidth gap="l" marginBottom="40">
                    {about.work.experiences.map((experience, index) => (
                      <ScrollReveal
                        key={`${experience.company}-${experience.role}-${index}`}
                        translateY={16}
                        delay={index * 0.1}
                      >
                        <Column fillWidth>
                          <Row
                            fillWidth
                            horizontal="between"
                            vertical="end"
                            marginBottom="4"
                          >
                            <Text
                              id={experience.company}
                              variant="heading-strong-m"
                            >
                              {experience.company}
                            </Text>
                            <Text                            
                              variant="heading-default-xs"
                              onBackground="neutral-weak"
                            >
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
                          <Column as="ul" gap="16" marginBottom="l">
                            {experience.achievements.map(
                              (achievement: React.ReactNode, index: number) => (
                                <Text
                                  as="li"
                                  variant="body-default-m"
                                  key={`${experience.company}-${index}`}
                                >
                                  {achievement}
                                </Text>
                              )
                            )}
                          </Column>
                          {experience.images &&
                            experience.images.length > 0 && (
                              <Row
                                fillWidth
                                paddingTop="m"
                                paddingLeft="40"
                                gap="12"
                                wrap
                              >
                                {experience.images.map((image, index) => (
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
                          <Row
                            fillWidth
                            horizontal="between"
                            vertical="end"
                            marginBottom="m"
                          >
                            <Text
                              id={institution.name}
                              variant="heading-strong-m"
                            >
                              {institution.name}
                            </Text>
                            {institution.timeframe && (
                              <Text                            
                                variant="heading-default-xs"
                                onBackground="neutral-weak"
                              >
                                {institution.timeframe}
                              </Text>
                            )}
                          </Row>
                          <Column marginBottom="l">
                            <Text
                              variant="body-default-m"
                              onBackground="neutral-weak"
                            >
                              {institution.description}
                            </Text>
                          </Column>
                          {institution.images &&
                            institution.images.length > 0 && (
                              <Row
                                fillWidth
                                paddingTop="m"
                                paddingLeft="40"
                                gap="12"
                                wrap
                              >
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
                      <ScrollReveal
                        key={`${skill}-${index}`}
                        translateY={16}
                        delay={index * 0.1}
                      >
                        <Column fillWidth gap="4">
                          <Text
                            id={skill.title}
                            variant="heading-strong-m"
                          >
                            {skill.title}
                          </Text>
                          <Text
                            variant="body-default-m"
                            onBackground="neutral-weak"
                          >
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
                            <Row fillWidth paddingTop="m" gap="12" wrap>
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
            </Column>
          </Row>
        </RevealFx>
      </Column>
    </>
  );
}
