/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import styled from '@emotion/styled'
// import { Document, Page} from 'react-pdf/dist/esm/entry.webpack';
import { Link } from 'gatsby';

import Head from '../components/head'
import Footer from '../components/footer'

import mkoLogo from '../media/mko-small.svg'

const Container = styled.div`
  background: #ffdab9;
  font-family: 'IBM Plex Mono';

  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;


  h1, h2, h3, h4 {
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.75rem;
    margin: 0;
  }
  p {
    font-family:"Inter UI", -apple-system,BlinkMacSystemFont, sans-serif;
    margin: 0;
    line-height: 1.75rem;
  } 

`

/*const Viewer = styled(Document)`
  width: auto;
  padding: 1rem;
`*/

const Content = styled.div`
  flex: 1;
  padding: 1rem;
`

const LogoContainer = styled(Link)`
  display: block;
  width: 64px;
  height: 56px;
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;

  transition: all .2s;
  &:hover {
    background-color: #C5D2EC;
  }
`

export default () => (
  <Container>
    <Head />

    <Content>
      <LogoContainer to="/" src={mkoLogo}></LogoContainer>
      <h2><i>CV & Skills</i></h2>
      <p>This page is a work in progress</p>
      <a href="/media/cv.pdf" >Download the CV</a>
      
    </Content>
    <Footer />
  </Container>
)
