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
  background: #ffdab9;
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
  const [image, setImage] = useState(null);

  let featuredPosts = data.posts.edges.filter(i => i.node.frontmatter.featured === true)
  let otherPosts = data.posts.edges.filter(i => !i.node.frontmatter.featured)

  return (
    <Container>
      <Head title="Marko [Mark Spurgeon]" />
      <Header>
        <Links />
      </Header>
      <Screen>
        <MobilePosts items={featuredPosts} images={data.images.edges} />
        <ScreenImage fluid={image} />
      </Screen>
      <NavigationContainer>
        <Navigation>
          <MeCard />
              <DesktopPosts items={featuredPosts} data={data} setImage={setImage} />
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
    posts : allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          frontmatter {
            title
            date
            image
            featured
            authors
            color
            outline
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 1400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          slug
        }
      }
    }
    images: allFile {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            fluid(maxWidth: 1400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`