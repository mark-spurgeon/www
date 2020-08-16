import React, { useEffect, useState } from 'react'
import { Octokit } from '@octokit/rest'
import Helmet from 'react-helmet'

import Head from '.../../components/head'
import Footer from '.../../components/footer'

import Heading from './heading'
import Authenticator from './authenticator'
import Link from './link'
import Category from './category'

import { Button, TabButton } from './ui.js'

const defaultLink = {
  id: 0,
  name: 'Untitled',
  type: 'link',
  category: 'other',
  tags: [],
  data: 'https://markspurgeon.ch',
}

const defaultCategory = {
  id: 'untitled',
  name: 'Untitled',
  order: 4,
  colour: 'green'
}

export default () => {
  const [uiEditor, setUiEditor] = useState('links')
  const [uiDataChanged, setUiDataChanged] = useState(false)
  const [authToken, setAuthToken] = useState(null)
  const [updateMessage, setUpdateMessage] = useState('')
  const [initialData, setInitialData] = useState([])
  const [data, setData] = useState([])

  /**
   * Retrieve data from the repo.
   */
  useEffect(() => {
    if (authToken) {
      const octokit = new Octokit({
        auth: authToken
      });
      
      octokit.repos.getContent({
        owner: "the-duck",
        repo: "databases",
        path: 'links.json',
      })
      .then(({ data: { content }}) => {
        // decode and parse
        let data = JSON.parse(atob(content))
        setInitialData(data)
        setData(data)
      })
      .catch(error => console.warn(error))
    }
  }, [authToken])

  /**
   * On data change
   */
  useEffect(() => {
    setUiDataChanged((data !== initialData))
  }, [initialData, data])

  /**
   * Upload data to Github
   * @param {*} newData 
   */
  const uploadData = (newData) => {
    if (initialData !== newData) {
      const octokit = new Octokit({
        auth: authToken
      })
      
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
          message: updateMessage || `Update from website [general]`,
          content: Buffer.from(JSON.stringify(newData, null, 2)).toString("base64"),
          sha: data.sha,
          committer: {
            name: 'the-duck',
            email: 'markspurgeon96@hotmail.com',
          }
        })
      })
      .catch(error => console.warn(error))
      .then(() => setInitialData(newData))
    }
  }

  /**
   * EVENT : update main data with modified category
   * @param {*} updatedCategory 
   */
  const onUpdatedCategory = (updatedCategory) => {
    let newData = {
      ...data,
      categories: [
        ...data.categories.filter(cat => cat.id !== updatedCategory.id),
        updatedCategory,
      ].sort((a, b) => a.order - b.order)
    }
    setData(newData)
  }

  /**
   * EVENT : update main data with modified link
   * @param {*} updatedLink 
   */
  const onUpdatedLink = (updatedLink) => {    
    let newLinks = [
      ...data.items.filter(link => link.id !== updatedLink.id),
      updatedLink,
    ]
    .filter(link => link.status !== 'deleted')
    .sort((a,b) => b.id - a.id)
    
    let newData = {...data, items: newLinks}

    setData(newData)
  }

  /**
   * EVENT: add link to data
   */
  const onNewLink = () => {
    let newLink = {
      ...defaultLink,
      status: 'new',
      id: Date.now(),
    }

    let newData = {
      ...data,
      items: [
        ...data.items,
        newLink,
      ].sort((a,b) => b.id - a.id)
    }
    setData(newData)
  }

  /**
   * EVENT: add link to data
   */
  const onNewCategory = () => {
    let newCategory = {
      ...defaultCategory,
      order: data.categories.length,
    }

    let newData = {
      ...data,
      categories: [
        ...data.categories,
        newCategory,
      ].sort((a,b) => b.order - a.order)
    }
    setData(newData)
  }


  /**
   * COMPONENT[] : Links 
   */
  let Links;
  if (data && data.items) {
    Links = data.items.map((link, index) => { 
      return (link.status === 'visible' || link.status === 'new') ? (
        <Link input={link} index={index} key={link.id} onChange={onUpdatedLink} />
      ) : null;
    })
  }

  /**
   * COMPONENT[] : Links 
   */
  let Categories
  if (data && data.categories) {
    Categories = data.categories.map((category, index) => (
      <Category input={category} index={index} key={category.id} onChange={onUpdatedCategory} />
    ))
  }

  return (
    <main style={{ padding: '0.5rem' }}>
      <Helmet>
        <Head />
        <title>MKO ADMIN / Links</title>
        <meta name="robots" content="noindex"></meta>
      </Helmet>
      <Heading>
        Marko's Links & References
        { authToken &&
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <Button
              title="Update All"
              onClick={() => uploadData(data)}
              disabled={!uiDataChanged} 
              color="#42b438"
              style={{marginRight: '0.25rem'}}
              >
              🔨
            </Button>
            <Button 
              title={`New item in ${uiEditor}`}
              color="transparent"
              onClick={() => uiEditor === 'categories' ? onNewCategory() : onNewLink()}>  
            📮
            </Button>
          </div>
        }
      </Heading>
      <Heading>
          <TabButton
            onClick={() => setUiEditor('categories')} 
            where='left'
            selected={uiEditor === 'categories'} >
            Categories
          </TabButton>
          <TabButton
            onClick={() => setUiEditor('links')}
            where='right'
            selected={uiEditor === 'links'} >
            Links
          </TabButton>
      </Heading>
      
      { authToken ? (uiEditor === 'links' ? Links : Categories) : <Authenticator onAuth={setAuthToken} /> }
      <Footer />
    </main>
  )
}