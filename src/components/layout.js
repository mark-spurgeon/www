import React from 'react';
import styled from '@emotion/styled'
import Color from 'color'

import Masthead from './masthead'
import Footer from './footer'

const Styled = styled.div`
  padding: 0;
  margin: 0;
  font-family:-apple-system,BlinkMacSystemFont, sans-serif;
  overflow: scroll;
  padding-bottom: 1rem;

  & ::selection {
      background: ${({ color, defColor }) => color !== 'black' ? Color(color).lighten(0.4).rgb().string() : defColor || defColor} !important;
      opacity: 0.5;
  }
  & ::-moz-selection {
      background: ${({ color, defColor }) => color !== 'black' ? Color(color).lighten(0.4).rgb().string() : defColor || defColor} !important;
      opacity: 0.5;
  }
  
  p, ul, ol, code, blockquote {
      max-width: 37rem;
      margin: 0 auto;
      line-height: 1.75;
      margin-top: 1rem;
      color: rgb(30, 30, 60);
  }

  h1, h2, h3, h4 {
      font-family: "IBM Plex Mono", Apple, sans-serif;
      max-width: 37rem;
      margin: 0 auto;
      margin-top: 1rem;
      line-height: 1.25;
  }

  h1 {
      font-size: 2.369rem;
      font-weight: 400;
      color: ${props => props.color};
      text-rendering: geometricPrecision;

      border-style: solid;
      border-width: 0;
      border-bottom-width: 1px;
      border-color: rgb(240, 240, 240);
      margin-bottom: 1rem;
  }
  h2 {
      font-size: 1.777rem;
      font-weight: 400;
      text-rendering: geometricPrecision;
  }
  h3 {
      font-size: 1.333rem;
      font-weight: 500;
      text-rendering: geometricPrecision;
  }

  p {
      text-align: justify;
      font-size: 1rem;
  }

  table {
      width: 100%;
      max-width: 37rem;
      margin: 0 auto;
      margin-top: 1rem;
      border-collapse: collapse;
      padding-bottom: 2px;
      font-size: 1rem;
  }
  th { 
      padding: 0.5rem 0 0.5rem 0;
      text-align: center;
      border-width: 0; 
      border-bottom-style: solid;
      border-bottom-width: 2px;
      border-color: black;
      border-left-width: 1px;
      border-left-style: dotted;
  }
  th:first-of-type {border-left-width: 0px;}
  td {
      padding: 0.5rem; text-align: center;
      border-style: solid;
      border-width: 0;
      border-left-width: 1px;
      border-left-style: dotted;
      border-bottom-width: 1px;
      border-bottom-color: rgb(100, 100, 100)
  }
  td:first-of-type {
      border-left-width: 0px;
  }
  tr:last-child td {
      border-bottom-width: 0;
  }

  hr {
      color: rgb(250, 250, 250);
      max-width: 37rem;
      margin: 0 auto;
      margin-top: 1rem;
  }

  ul.contains-task-list { list-style-type: none; }

  blockquote {
      font-style: italic;
      background: #ffe0c4;
      padding: 0rem 1rem 0.5rem 1rem;
  }
  blockquote p {
      color: #776758;
      line-height: 1.25;
      padding-top: 0.5rem;
  }

  a {
      color: #0070b8;
  }

  iframe {
      display: block;
      margin: 0 auto;
      max-width: 100%;
  }
`

const Article = styled.article`
  margin-top: 0rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`

export default (props) => {
  const { children, pageContext } = props
  const color = pageContext.frontmatter.color
  const nobg = pageContext.frontmatter.nobg
  return (
    <Styled color={color} defColor="rgb(240, 240, 240)">
      <Masthead context={pageContext || null} nobg={nobg} />
      <Article>{children}</Article>
      <Footer />
    </Styled>
  )
}