import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import Head from '../components/head'
import Footer from '../components/footer'



const Container = styled.main`
  flex: 1;
  min-height: 100vh;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12pt;
`

const Box = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  width: 28rem;
  max-width: 100%;
`

const Heading = styled.h2`
  color: #e60000;
  font-weight: 400;
`

const PostLink = styled(Link)`
  display: block;
  color: #7896ff;
`

export default ({ data }) => {
  let posts = data.page.edges.map(item => <PostLink to={`${item.node.path}`}>{item.node.path}</PostLink>)
  return (
    <Container>
      <Helmet>
        <Head />
        <title>404 | Marko [Mark Spurgeon]</title>
        <meta name="robots" content="noindex"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Helmet>
      <Box>
        <Heading>404 - Page not found</Heading>
        <p>Wrong link... Sorry !</p>
        <p>Were you looking for one of these ?</p>
        {posts}
      </Box>
      <Footer />
    </Container>
  )
}


export const pageQuery = graphql`
  query {
    page: allSitePage {
      edges {
        node {
          path
        }
      }
    }
  }
`
