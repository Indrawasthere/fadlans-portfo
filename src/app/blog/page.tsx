import { Column, Heading, Meta, Schema, RevealFx } from "@once-ui-system/core";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";
import NeonParticles from "@/components/NeonParticles";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  return (
    <>
      <NeonParticles />
      <Column fillWidth className="relative" style={{ zIndex: 1 }}>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <RevealFx translateY="16" delay={0.2}>
        <Column 
          fillWidth 
          paddingX="xl" 
          maxWidth="l" 
          style={{ margin: "0 auto" }}
          paddingTop="24"
        >
          <ScrollReveal translateY={16} delay={0.1}>
            <Heading marginBottom="l" variant="heading-strong-xl" align="center" className="neon-title">
              {blog.title}
            </Heading>
          </ScrollReveal>
          <Column fillWidth flex={1} gap="40">
            <ScrollReveal translateY={16} delay={0.2}>
              <Posts range={[1, 1]} thumbnail />
            </ScrollReveal>
            <ScrollReveal translateY={16} delay={0.3}>
              <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
            </ScrollReveal>
            <ScrollReveal translateY={16} delay={0.4}>
              <Mailchimp marginBottom="l" />
            </ScrollReveal>
            <ScrollReveal translateY={16} delay={0.5}>
              <Heading as="h2" variant="heading-strong-xl" align="center" className="neon-sub">
                Earlier posts
              </Heading>
            </ScrollReveal>
            <ScrollReveal translateY={16} delay={0.6}>
              <Posts range={[4]} columns="2" />
            </ScrollReveal>
          </Column>
        </Column>
      </RevealFx>
      </Column>
    </>
  );
}
