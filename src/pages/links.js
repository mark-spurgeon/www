import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useSwr from 'swr'

import Head from '../components/head'
import Footer from '../components/footer'
import { Square } from '../components/legend'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex; 
  flex-direction: row;
  justify-content: center;

  font-family: 'IBM Plex Mono', monospace;
  background: #27211c;
  color: #947a61;
`

const Container = styled.main`
  width: 100%;
  max-width: 1100px;
  flex: 1;
  display: flex; 
  flex-direction: column;
  align-items: center;
`

const Heading = styled.div`
  font-size: 1.4rem;
  font-weight: 300;
  text-align: center;
  color: #947a61;
  transition: all .2s;
  @media (max-width: 500px) {
    width: 100%;
    padding-left: 3rem;
    text-align: left;
  }
`

const Description = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  text-align: center;
  font-style: italic;
  margin-bottom: 1rem;
  max-width: 24rem;
  color: #947a61;
  @media (max-width: 600px) {
    display: none;
  }
`

const Legend = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-style: solid;
  border-width: 0;
  border-top-width: 1px;
  border-color: #947a61;
`

const BoxesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;
`

const ListBoxContainer = styled.div`
  flex: 1;
  min-width: 350px;
  max-width: 500px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
`

const Category = styled.h2`
  display: inline-block;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  font-weight: 500;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.02rem;
  margin: 0;
  margin-bottom: 0.6rem;
  color: ${props => props.color || '#e7be95'};
`

const TypeContainer = styled.div`
  display: block;
  margin-bottom: 1rem;
`

const ALink = styled.a`
  display: block;
  color: ${props => props.color || '#ffe5bb'};
  font-size: 1rem;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const LinkBox = ({
  data,
}) => {
  let { news, links } = data.links;
  
  let newsList = news.map(item => (
    <ALink key={item.id} href={item.data} title={item.name}>
      {item.name}
    </ALink>
  ));

  let linksList = links.map(item => (
    <ALink key={item.id} href={item.data} title={item.name} color={data.colour}>
      {item.name}
    </ALink>
  ))

  return (
    <ListBoxContainer>
      <Category color={data.colour}>{data.name}</Category>
      {newsList.length > 0 &&
        <TypeContainer>{newsList}</TypeContainer>
      }
      {linksList.length > 0 &&
        <TypeContainer>{linksList}</TypeContainer>
      }
    </ListBoxContainer>
  )
}

function useLinks () {
  const { data, error } = useSwr('/api/links', fetcher)
  const sourceLinks = (!error && data && data.status === 'ok') ? data.items : [];
  const sourceCategories = (!error && data && data.status === 'ok') ? data.categories.sort((a,b) => a.order - b.order) : [];
  /* Restructure */
  let linkCategories = sourceCategories.map((category) => ({
    ...category,
    links: {
      news: sourceLinks.filter(link => (link.category === category.slug && link.type === 'news')).sort((a, b) => b.id - a.id),
      links: sourceLinks.filter(link => (link.category === category.slug && link.type === 'link')).sort((a, b) => b.id - a.id),
    }
  }))
  // filter the categories that have links or not
  let linkSections = linkCategories.filter(category =>  category.links.news.length > 0 || category.links.links.length > 0)
  return { linkSections }
}

export default () => {
  const { linkSections } = useLinks()

  const linkBoxes = linkSections.map(data => <LinkBox data={data} key={data.id} />)

  return (
    <Body>
      <Container>
        <Head />
        <Heading>Marko's Links</Heading>
        <Description>A list of all things that sparked my attention on the web, plus some useful (re)sources.</Description>
        <BoxesContainer>
          {(linkSections.length > 0) ? linkBoxes : '...'}
        </BoxesContainer>
        <Legend>
          <Square bg="#e7be95" label="News" />
          <Square bg="#197163" label="Tools/Resources" />
        </Legend>
        <Footer />
      </Container>
    </Body>
  )
}