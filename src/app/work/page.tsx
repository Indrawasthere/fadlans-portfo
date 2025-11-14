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
import NeonParticles from "@/components/NeonParticles";

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
    <>
      <NeonParticles />
      <Column fillWidth className="relative" style={{ zIndex: 1 }}>
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
        <Row 
          fillWidth 
          s={{ direction: "column" }} 
          horizontal="center"
          paddingX="xl"
          maxWidth="l"
          style={{ margin: "0 auto" }}
        >
          <Column
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="240"
            paddingX="xl"
            paddingBottom="xl"
            gap="l"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" style={{ width: "200px", height: "200px" }} />
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
          <Column flex={9} maxWidth={50} paddingX="xl">
            <ScrollReveal translateY={16} delay={0.1}>
              <Heading marginBottom="l" variant="heading-strong-xl" align="center" className="neon-title">
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
    </>
  );
}
