import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import useSwr from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Menu = styled.button`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1rem;
  max-height: 2rem;
  line-height: 2rem;

  background: inherit;
  border-style: solid;
  border-width: 0;
  padding: 0;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  cursor: pointer;
  transition: all .4s;

  &:hover {
    background: #ffab61;
  }
`

const ListContainer = styled.div`
  flex: 1;
  overflow: hidden;
  margin-right: 0.5rem;
`

const LinkSeparator = styled.span`
  color: black;
  font-weight: 300;
`

const StyledLink = styled.a`
  margin-right: 0.5rem;
  white-space: nowrap;
  text-decoration: none;
  color: ${props => {
    switch (props.category) {
      case 'urbanism':
        return '#71bc78';
      case 'economy':
        return 'blue'
      case 'other':
        return 'black';
      default : return 'black'
    }
  }};

  &:hover {
    text-decoration: underline;
  }
`

const Link = ({
  name,
  data,
  category,
}) => (
  <StyledLink href={data} category={category} title={name} target="_blank">
    <LinkSeparator>/ </LinkSeparator>
    {name}
  </StyledLink>
)

function useLinks () {
  const { data, error } = useSwr('/api/links', fetcher)
  const sourceLinks = (!error && data && data.status === 'ok') ? data.results : [];
  /* Reorder / Filter */
  const links = sourceLinks.filter(l => l.type === 'news')

  return { links }
}

export default () => {
  const hover = useRef('hover')
  const scroll = useRef('scroll')
  const listContainer = useRef('listContainer')
  const { links } = useLinks()

  useEffect(() => {
    const interval = setInterval(() => {

      if (links && !hover.current) {
        const { scrollLeft } = listContainer.current;
        
        if (scrollLeft > scroll.current || scrollLeft === 0) {
          listContainer.current.scrollBy({left: 20, behavior: 'smooth'})
        } else {
          listContainer.current.scrollTo({left: 0, behavior: 'smooth'})
        }
        
        scroll.current = scrollLeft
      }
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  let linkListItems = links.map(data => <Link {...data} key={data.data} />)
  
  return (
    <>
      <Menu>Links <LinkSeparator>/</LinkSeparator></Menu>
      <ListContainer ref={listContainer} onMouseEnter={() => hover.current = true} onMouseLeave={() => hover.current = false}>
        { links ? linkListItems : '...' }
      </ListContainer>
    </>
  )
}