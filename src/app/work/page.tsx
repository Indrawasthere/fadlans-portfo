import {
  Avatar,
  Column,
  Heading,
  Icon,
  Meta,
  Row,
  Schema,
  RevealFx,
  Tag,
  Text
} from "@once-ui-system/core";
import { ScrollReveal } from "@/components/ScrollReveal";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <RevealFx translateY="16" delay={0.2}>
        <Row fillWidth s={{ direction: "column"}} horizontal="center">
          <Column
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
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
          <Column flex={9} maxWidth={40}>
            <ScrollReveal translateY={16} delay={0.1}>
              <Heading marginBottom="l" variant="heading-strong-xl" align="center">
                {work.title}
              </Heading>
            </ScrollReveal>
            <ScrollReveal translateY={16} delay={0.2}>
              <Projects />
            </ScrollReveal>
          </Column>
        </Row>
      </RevealFx>
    </Column>
  );
}
