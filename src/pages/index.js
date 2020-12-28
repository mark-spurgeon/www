import React, { useState } from 'react';
import { graphql } from "gatsby";
import styled from '@emotion/styled';
import BackgroundImage from 'gatsby-background-image'

import Head from '../components/head'
import Footer from '../components/footer'

import MeCard from '../components/index/card-me'
import DesktopPosts from '../components/index/desktop-posts'

import RecentPostsCard from '../components/index/card-recentposts'
import Links from '../components/index/links'

import MobilePosts from '../components/index/mobile-posts'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  flex: 1;
  max-height: 2rem;
  background: #27211c;
  color: white;
  font-family: 'IBM Plex Mono';
  line-height: 2rem;
  display: flex;
  flex-direction: row;
`

const Screen = styled.div`
  flex: 1;
  /*background-color: rgb(50, 60, 80);*/
  overflow: hidden;

  display: flex;
  flex-direction: column;
`

const ScreenImage = styled(BackgroundImage)`
  flex: 1;
  width: 100%;
  height: 100%;
  @media (max-width: 600px) {display: none}
`

const NavigationContainer = styled.div`
  z-index: 1000;
  flex: 0;
  width: 100%;
  height: 8rem;
  min-height: 8rem;

  background-color: #ffdab9;
  box-shadow: 0 0 4rem rgba(0,0,0, 0.2);

  border-style: solid;
  border-width: 0;
  border-top-width: 1px;
  border-color: #4f443b;

  display: flex;
`

const Navigation = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  background-color: #ffdab9;
`

const Index = ({
  data
}) => {
  const [image, setImage] = useState(data.homeImage.childImageSharp.fluid);
  const otherPosts = [];

  const featuredProjects = data.projects.edges.filter(p => p.node.status === 'featured')

  return (
    <Container>
      <Head title="Mark Spurgeon">
        <meta name="description" content="Welcome to my digital home. I'm a geographer/urbanist and I do cartography, web design, videos, 3D art and drawing." />
      </Head>
      <Header>
        <Links />
      </Header>
      <Screen>
        <MobilePosts items={featuredProjects} />
        <ScreenImage fluid={image} />
      </Screen>
      <NavigationContainer>
        <Navigation>
          <MeCard onHover={() => setImage(data.homeImage.childImageSharp.fluid)} />
              <DesktopPosts items={featuredProjects} setImage={setImage} />
              <RecentPostsCard items={otherPosts} />
        </Navigation>
      </NavigationContainer>
      <Footer />
    </Container>
  );
}

export default Index;

export const pageQuery = graphql`
  query {
    homeImage : file(relativePath: {eq: "parcs.jpg"}) {
      id
      childImageSharp {
        fluid(maxWidth: 1400, maxHeight: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    projects: allProject(sort: {fields: [date], order: DESC}, filter: {language: {eq: "en"}}) {
      edges {
        node {
          url
          title
          status
          thumbnail
          description
          language
          thumbnailImage {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              srcSetType
              sizes
              originalImg
              density
              presentationWidth
              presentationHeight
            }
          }
        }
      }
    }
  }
`