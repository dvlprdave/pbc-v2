import React from "react";

import Layout from "@narative/gatsby-theme-novela/src/components/Layout";
import Section from "@narative/gatsby-theme-novela/src/components/Section";
import SEO from "@narative/gatsby-theme-novela/src/components/SEO";
import Headings from "@narative/gatsby-theme-novela/src/components/Headings";
import Paragraph from "@narative/gatsby-theme-novela/src/components/Paragraph";
import Blockquote from "@narative/gatsby-theme-novela/src/components/Blockquote";

const AboutPage = () => {
  return (
    <Layout>
      <SEO pathname={'/about'} />
      <Section>
        <div style={{ marginTop: "100px" }}>
          <Headings.h1>Hey there.</Headings.h1>
          <Paragraph>The names David and I'm a Front-End Developer from NYC.</Paragraph>
          <Paragraph>I've been writing code since 2017 and as a self-taught developer, I've learned everything I do now through others sharing their knowledge.</Paragraph>
          <Paragraph>This blog is an ode to those seeking to continually better themselves and learn. SO heres my notebook to you!</Paragraph>

          <Blockquote>“To make claim of having achieved the best version of anything is to expell any idea and motivation of becoming better tomorrow. You are always a rough draft.”</Blockquote>
        </div>
      </Section>
    </Layout>
  );
}

export default AboutPage;