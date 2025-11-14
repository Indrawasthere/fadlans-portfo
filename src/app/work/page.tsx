import {
  Column,
  Heading,
  Icon,
  Meta,
  Row,
  Schema,
  Tag,
  Text,
  Line,
  RevealFx,
} from "@once-ui-system/core";
import { baseURL, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { ScrollReveal } from "@/components/ScrollReveal";

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
      <Column
        fillWidth
        maxWidth="xl"
        className="relative"
        style={{ zIndex: 1, paddingTop: "40px", paddingBottom: "80px" }}
      >
        {/* SCHEMA */}
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={work.path}
          title={work.title}
          description={work.description}
          image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${work.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />

        {/* NEON CONTAINER */}
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
            s={{ padding: "l" }}
          >
            {/* ================= HEADER (NO AVATAR) ================= */}
            <ScrollReveal translateY={16} delay={0.15}>
              <Column fillWidth gap="16">
                <Heading
                  variant="display-strong-xl"
                  className="neon-title"
                  style={{ lineHeight: "1.1" }}
                >
                  Projects
                </Heading>

                <Text
                  variant="body-default-l"
                  onBackground="neutral-weak"
                  style={{ maxWidth: "80%" }}
                  s={{
                    maxWidth: "80%",
                    textAlign: "center",
                    marginTop: "8px",
                  }}
                >
                  A collection of the things I’ve been building — from experimental UIs,
                  shipping-ready platforms, to ideas that accidentally became real products.
                </Text>
              </Column>
            </ScrollReveal>

            {/* GLOW DIVIDER */}
            <Row fillWidth horizontal="center" marginTop="xl" marginBottom="xl">
              <Line
                maxWidth="100%"
                style={{
                  background: "rgba(0,255,255,0.3)",
                  height: "2px",
                  boxShadow: "0 0 12px rgba(0,255,255,0.5)",
                }}
              />
            </Row>

            {/* ================= PROJECTS SECTION ================= */}
            <ScrollReveal translateY={16} delay={0.25}>
              <Heading
                as="h2"
                variant="heading-strong-l"
                className="neon-title"
                marginBottom="24"
              >
                Explore My Work
              </Heading>
            </ScrollReveal>

            <ScrollReveal translateY={16} delay={0.35}>
              <Column fillWidth gap="xl">
                <Projects className="work-grid" />
              </Column>
            </ScrollReveal>
          </Column>
        </RevealFx>
      </Column>
    </>
  );
}
