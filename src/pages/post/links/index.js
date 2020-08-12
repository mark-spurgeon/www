import React, { useEffect, useState } from 'react'
import { Octokit } from '@octokit/rest'
import Helmet from 'react-helmet'

import Head from '.../../components/head'
import Footer from '.../../components/footer'

import Heading from './heading'
import Authenticator from './authenticator'
import Link from './link'

import { Button } from './ui.js'

const defaultLink = {
  id: 0,
  name: 'Untitled',
  type: 'link',
  category: 'other',
  tags: [],
  data: 'https://markspurgeon.ch'
}

export default () => {
  const [authToken, setAuthToken] = useState(null)
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const octokit = new Octokit({
      auth: authToken
    });
    
    octokit.repos.getContent({
      owner: "the-duck",
      repo: "databases",
      path: 'links.json',
    })
    .then(({ data }) => {
      let decodedData = JSON.parse(atob(data.content)).sort((a,b) => b.id - a.id)
      setLinks(decodedData)
    })
    .catch(error => {
      console.warn(`Network error ! Try again later. Message: ${error.message}`)
    })
  }, [authToken])

  const onLinkChange = (updatedLink) => {
    let newLinks = links.filter(link => link.id !== updatedLink.id)
    newLinks = [...newLinks, updatedLink]
      .filter(link => link.status !== 'deleted')
      .sort((a,b) => b.id - a.id)
    /**
     * Update repo
     */

    if (newLinks !== links) {
      const octokit = new Octokit({
        auth: authToken
      });
      octokit.repos.getContent({
        owner: "the-duck",
        repo: "databases",
        path: 'links.json',
      })
      .then(({ data }) => {
        octokit.repos.createOrUpdateFileContents({
          owner: 'the-duck',
          repo: 'databases',
          path: 'links.json',
          message: `Updated link n°${updatedLink.id}`,
          content: Buffer.from(JSON.stringify(newLinks, null, 2)).toString("base64"),
          sha: data.sha,
          committer: {
            name: 'the-duck',
            email: 'markspurgeon96@hotmail.com',
          }
        })
      })
      .catch(error => {
        console.warn(`Error while retrieving links: ${error.message}`)
      })
      .then(() => {
        setLinks(newLinks)
      })
    }
  }

  const onNewLink = () => {
    let newLink = {
      ...defaultLink,
      status: 'new',
      id: Date.now(),
    }
    let newLinks = [ ...links, newLink ].sort((a,b) => b.id - a.id)
    setLinks(newLinks)
  }

  let Links = links.map((link, index) => { 
    return (link.status === 'visible' || link.status === 'new') ? (
      <Link input={link} index={index} key={link.id} onChange={onLinkChange} />
    ) : null;
  })

  return (
    <main style={{marginTop: '5rem', padding: '0.5rem'}}>
      <Helmet>
        <Head />
        <title>Marko's Links</title>
      </Helmet>
      <Heading>
        Marko's Links & References
        { authToken && <Button title="new link" color="transparent" onClick={onNewLink}>N</Button>}
      </Heading>
      {
        authToken && 
          Links
      }
      {
        !authToken &&
          <Authenticator onAuth={setAuthToken} />
      }
      <Footer />
    </main>
  )
}