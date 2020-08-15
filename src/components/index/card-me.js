import React, { useState } from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
// import { graphql, useStaticQuery } from "gatsby";
// import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faGlobe, faPaperPlane, faPaintBrush } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Container = styled.div`
  display: block;
  max-height: 4rem;
  width: 24rem;
  
  @media (max-width: 600px) {
    width: 100%;
  }
`

const hoveredStyles = css`
  max-height: 14rem;
  height: 100%;
  border-bottom-width: 0;
  border-color: #f0cbab;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  box-shadow: 0 0 4px 4px rgb(50, 50, 50, 0.04);
`

const MeCard = styled.div`
    label: me-card;
    display: block;
    position: absolute;
    bottom: 0;
    width: 24rem;
    padding: 0;
    margin: 0;
    overflow: hidden;

    background-color: #ffdab9;

    border-style: solid;
    border-width: 0px;
    border-bottom-width: 0;
    border-color: transparent;
    border-top-left-radius: 0;
    border-top-right-radius: 0;


    transition: all .3s;
    
    height: 8rem;
    max-height: 8rem;
  
    ${props => props.hovered ? hoveredStyles: null }

    @media (max-width: 600px) {
        width: 100%;
        ${hoveredStyles};
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
`

const LogoContainer = styled.div`
    transition: all .3s;
    max-height: ${props => props.hovered ? '4rem': '0.3rem'};
    height: 4rem;
    @media (max-width: 600px) {
      max-height: 4rem;
    }
    background: rgb(240, 30, 80);
`

const TextContainer = styled.div`
    padding: 0;
    margin: 0;
    border-style: solid;
    border-width: 0;
    border-left-width: 1px;
    border-right-width: 1px;
    border-color: ${props => props.hovered ? '#e7be95' : 'transparent'};
    @media (max-width: 600px) {
      max-height: 4rem;
    }
    transition: all .2s;
`

const Name = styled.div`
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.333rem;
    font-weight: 400;
    line-height: 1;
    padding-left: 0.5rem;
    padding-top: 0.5rem;
`

const Description = styled.div`
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    font-weight: 500;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-top: 0.25rem;
`

const SocialBox = styled.div`
    margin: 0.5rem;
`

const Social = styled(Link)`
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    background-color: ${props => props.nobg ? 'transparent' : '#FECD9A'};
    padding: 0.15rem 0.6rem 0.15rem 0.6rem;
    border-radius: 0.75rem;
    margin-right: ${props => props.nobg ? '0' : '0.4rem'};


    color: ${props => props.color || 'black'}
`

const SeriousBox = styled.div`
    display: flex;
    flex-direction: row;
    height: 2.6rem;
    padding-right: 0.5rem;
    /*background: #f6cfb3;*/
    border-style: solid;
    border-width: 0;
    border-top-width: 1px;
    border-color: ${props => props.hovered ? '#e7be95' : 'transparent'};
    margin-top: ${props => props.hovered ? '0' : '2rem'};
    transition: all .3s .1s;
    
    @media (max-width: 600px) {
      border-color: #e7be95;
      margin-top: 0rem;
    }
`


const LinkAnimation = keyframes`
    from, 50%, to {
        background-color: #3F6DF3;
    }

    25%, 80% {
        background-color: #D51A53;
    }

    90% {
        background-color: #55BF62;
    }

`

const SeriousLink = styled(Link)`
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    line-height: 1.4rem;
    text-decoration: none;
    border-radius: 0.15rem;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    flex: 1;

    padding: 0.15rem 0.6rem 0.15rem 0.6rem;
    animation: ${props => props.nobg ? null : LinkAnimation} 4s ease infinite;
    color: ${props => props.nobg ? 'black': 'white'};


`

export default () => {
    const [hovered, setHovered] = useState(true);
    const onMouseEnter = () => {
        setHovered(true)
    }
    const onMouseLeave = () => {
        setHovered(false)
    }

    return (
      <Container>
        <MeCard onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} hovered={hovered} >
            <LogoContainer hovered={hovered} />
            <TextContainer hovered={hovered}>
                <Name>Mark Spurgeon</Name>
                <Description>
                    Hi! I'm a geographer/urbanist studying at the University of Geneva.
                    I make cartography, websites and sometimes artwork :)
                </Description>

                <SocialBox>
                    <Social to="mailto:markspurgeon96@hotmail.com" title="Marko's E-mail">
                        <FontAwesomeIcon icon={faPaperPlane} /> ⌨ markspurgeon96@hotmail.com
                    </Social>
                    <Social to="https://github.com/the-duck" target="_blank" color="rgb(40, 50, 250)" title="Marko's Github" nobg>
                        <FontAwesomeIcon icon={faGithub} size="lg" title="Github Icon"  />
                    </Social>
                    <Social to="https://instagram.com/marko.studio" target="_blank" color="rgb(200, 50, 80)" title="Marko's Instagram" nobg>
                        <FontAwesomeIcon icon={faInstagram} size="lg" title="Instagram Icon" />
                    </Social>
                </SocialBox>

                <SeriousBox hovered={hovered}>
                    <SeriousLink to="/cv" title="Marko's CV">
                        <b><FontAwesomeIcon icon={faFile} title="CV" /> CV & Skills</b>
                    </SeriousLink>
                    <SeriousLink to="/links" title="Marko's Links" nobg>
                        <FontAwesomeIcon icon={faGlobe} title="Links" /> Links & references
                    </SeriousLink>
                </SeriousBox>
            </TextContainer>
        </MeCard>
      </Container>
    )
  }