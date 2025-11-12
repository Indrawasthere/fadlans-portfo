import { Column, Heading, Meta, Schema, RevealFx } from "@once-ui-system/core";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";

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
    <Column maxWidth="m" paddingTop="24">
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
        <ScrollReveal translateY={16} delay={0.1}>
          <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
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
            <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
              Earlier posts
            </Heading>
          </ScrollReveal>
          <ScrollReveal translateY={16} delay={0.6}>
            <Posts range={[4]} columns="2" />
          </ScrollReveal>
        </Column>
      </RevealFx>
    </Column>
  );
}
