import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";

import { ScrollReveal } from "@/components/ScrollReveal";
import { home, about, person, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <>
      <Column
        maxWidth="m"
        gap="xl"
        paddingY="12"
        horizontal="center"
        className="relative"
        style={{ zIndex: 1 }}
      >

      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* HERO */}
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">

          {home.featured.display && (
            <ScrollReveal translateY={16} delay={0.1}>
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
                className="neon-border"
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </ScrollReveal>
          )}

          {/* Headline */}
          <ScrollReveal translateY={4} delay={0.2}>
            <Heading
              className="neon-title"
              wrap="balance"
              variant="display-strong-l"
              marginTop="24"
              marginBottom="20"
            >
              {home.headline}
            </Heading>
          </ScrollReveal>

          {/* Subline */}
          <ScrollReveal translateY={8} delay={0.3}>
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
              marginTop="12"
              marginBottom="32"
              className="neon-sub"
            >
              {home.subline}
            </Text>
          </ScrollReveal>

          {/* Button -> About Page */}
          <ScrollReveal translateY={16} delay={0.4}>
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
              className="neon-border"
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </ScrollReveal>
        </Column>
      </Column>

      {/* Showcase Project 1 */}
      <ScrollReveal translateY={16} delay={0.5}>
        <Projects range={[1, 1]} cardClass="neon-border" />
      </ScrollReveal>

      {/* Latest Blog */}
      {routes["/blog"] && (
        <ScrollReveal translateY={16} delay={0.6}>
          <Column fillWidth gap="24" marginBottom="l">
            <Row fillWidth paddingRight="64">
              <Line maxWidth={48} />
            </Row>
            <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
              <Row flex={1} paddingLeft="l" paddingTop="24">
                <Heading as="h2" variant="display-strong-xs" wrap="balance" className="neon-sub">
                  Latest from the blog
                </Heading>
              </Row>
              <Row flex={3} paddingX="20">
                <Posts range={[1, 2]} columns="2" />
              </Row>
            </Row>
            <Row fillWidth paddingLeft="64" horizontal="end">
              <Line maxWidth={48} />
            </Row>
          </Column>
        </ScrollReveal>
      )}

      {/* More Projects */}
      <ScrollReveal translateY={16} delay={0.7}>
        <Projects range={[2]} cardClass="neon-border" />
      </ScrollReveal>

      {/* Newsletter */}
      <ScrollReveal translateY={16} delay={0.8}>
        <Mailchimp />
      </ScrollReveal>

      </Column>
    </>
  );
}
