import React, { useState } from 'react';
import { graphql } from "gatsby";
import styled from '@emotion/styled';
import Img from 'gatsby-image';

import Head from '../components/head'
import Footer from '../components/footer'

import MeCard from '../components/index/card-me'
import PostCard from '../components/index/card-post'

import RecentPostsCard from '../components/index/card-recentposts'
import Links from '../components/index/links'

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
  background-color: rgb(50, 60, 80);
  overflow: hidden;
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

const PostCardsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
`

export default ({
  data
}) => {
  const [image, setImage] = useState(null);
  const items = data.allMdx.edges
  
  const FeaturedPosts = items.map(item => {
    // TODO: replace 'true' with item.node.frontmatter.featured
    return true ? <PostCard 
      frontmatter={item.node.frontmatter} 
      data={data}
      onHover={({ image }) => setImage(image)}
      key={item.node.slug}
    /> : null;
  })


  return (
    <Container>
      <Head title="Marko [Mark Spurgeon]" />
      <Header>
        <Links />
      </Header>
      <Screen>
        <Img fluid={image} />
      </Screen>
      <NavigationContainer>
        <Navigation>
          <MeCard />
          <PostCardsContainer>
            {FeaturedPosts}
          </PostCardsContainer>
          <RecentPostsCard items={items} />
        </Navigation>
      </NavigationContainer>
      <Footer />
    </Container>
  );
}

export const pageQuery = graphql`
  query {
    allMdx (sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
            image
            featured
            authors
            color
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